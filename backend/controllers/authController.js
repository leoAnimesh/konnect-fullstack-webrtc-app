const {
  generateOtp,
  hashOtp,
  sendViaSms,
  verifyOtp,
} = require("../services/otpService");
const { findUser, createUser } = require("../services/userService");
const {
  generateToken,
  storeRefreshToken,
  verifyRefreshToken,
  findRefreshToken,
  updateRefreshToken,
  removeToken,
} = require("../services/tokenService");
const userDtos = require("../dtos/userDtos");

const sendOtpController = async (req, res) => {
  const { phone } = req.body;
  //validate phone number is passed or not
  if (!phone) {
    res.status(400).json({ message: "Phone feild is required" });
  }

  //genrate otp
  const otp = await generateOtp();

  //   hash the otp
  const ttl = 1000 * 60 * 2;
  const expires = Date.now() + ttl;
  const data = `${phone}.${otp}.${expires}`;
  const hash = await hashOtp(data);

  //send otp via sms and hash to client
  try {
    // await sendViaSms(phone, otp);
    res.json({
      hash: `${hash}.${expires}`,
      phone,
      otp,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error while sending otp via sms" });
  }
};

const verifyOtpController = async (req, res) => {
  const { phone, otp, hash } = req.body;

  if (!phone || !otp || !hash) {
    res.status(400).json({ message: "All feilds required" });
  }

  const [hashedOtp, expires] = hash.split(".");

  if (Date.now() > +expires) {
    res.status(400).json({ message: "otp expired" });
  }

  const data = `${phone}.${otp}.${expires}`;
  const isValid = verifyOtp(hashedOtp, data);

  if (!isValid) {
    res.status(400).json({ message: "invalid otp" });
  }

  //create user
  let user;

  try {
    user = await findUser({ phone });
    if (!user) {
      user = await createUser({
        phone,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
  }

  //create acess token
  const { acessToken, refreshToken } = generateToken({
    _id: user._id,
    activated: false,
  });

  await storeRefreshToken(refreshToken, user._id);

  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  res.cookie("accessToken", acessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  const userDto = new userDtos(user);
  res.json({ user: userDto, auth: true });
};

const refreshController = async (req, res) => {
  // get refresh token from cookie
  const { refreshToken: refreshTokenFromCookie } = req.cookies;
  // check if token is valid
  let userData;
  try {
    userData = await verifyRefreshToken(refreshTokenFromCookie);
  } catch (err) {
    res.status(401).json({ message: "invalid token" });
  }
  //check if token is in db
  try {
    const token = await findRefreshToken(userData._id, refreshTokenFromCookie);
    if (!token) {
      res.status(401).json({ message: "invalid token" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
  // check if user is valid
  const user = await findUser({ _id: userData._id });
  if (!user) {
    res.status(404).json({ message: "no user " });
  }
  //generate new tokens
  const { refreshToken, acessToken } = await generateToken({
    _id: userData._id,
  });
  //update refresh token
  try {
    await updateRefreshToken(userData._id, refreshToken);
  } catch (err) {
    res.status(500).json({ message: "error updating refresh token " });
  }
  //put in cookie
  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  res.cookie("accessToken", acessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  // response
  const userDto = new userDtos(user);
  res.json({ user: userDto, auth: true });
};

const logoutController = async (req, res) => {
  const { refreshToken } = req.cookies;
  //delete refresh token from db
  await removeToken(refreshToken);
  //delete cookie
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  //response
  res.json({ user: null, auth: false });
};

module.exports = {
  sendOtpController,
  verifyOtpController,
  refreshController,
  logoutController,
};
