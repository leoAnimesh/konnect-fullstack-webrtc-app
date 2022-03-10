const {
  generateOtp,
  hashOtp,
  sendViaSms,
  verifyOtp,
} = require("../services/otpService");
const { findUser, createUser } = require("../services/userService");
const { generateToken } = require("../services/tokenService");

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

  if (Date.now > +expires) {
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

  res.cookie("refreshTokken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  res.json({ acessToken });
};

module.exports = {
  sendOtpController,
  verifyOtpController,
};
