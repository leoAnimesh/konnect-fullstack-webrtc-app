const jwt = require("jsonwebtoken");
const acessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

const generateToken = (payload) => {
  const acessToken = jwt.sign(payload, acessTokenSecret, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: "1y",
  });

  return { refreshToken, acessToken };
};

module.exports = { generateToken };
