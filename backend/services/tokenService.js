const jwt = require("jsonwebtoken");
const acessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const refreshModel = require("../models/refreshModel");

const generateToken = (payload) => {
  const acessToken = jwt.sign(payload, acessTokenSecret, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: "1y",
  });

  return { refreshToken, acessToken };
};

const storeRefreshToken = async (token, userId) => {
  try {
    await refreshModel.create({ token, userId });
  } catch (err) {
    console.log(err.message);
  }
};

const verifyAcessToken = async (accessToken) => {
  return jwt.verify(accessToken, acessTokenSecret);
};

const verifyRefreshToken = async (refreshToken) => {
  return jwt.verify(refreshToken, refreshTokenSecret);
};

const findRefreshToken = async (userId, refreshToken) => {
  return await refreshModel.findOne({
    userId: userId,
    token: refreshToken,
  });
};

const updateRefreshToken = async (userId, refreshToken) => {
  return await refreshModel.updateOne({ userId }, { token: refreshToken });
};

const removeToken = async (refreshToken) => {
  return await refreshModel.deleteOne({ token: refreshToken });
};

module.exports = {
  generateToken,
  storeRefreshToken,
  verifyAcessToken,
  verifyRefreshToken,
  findRefreshToken,
  updateRefreshToken,
  removeToken,
};
