const { verifyAcessToken } = require("../services/tokenService");

module.exports = async function (req, res, next) {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw new Error();
    }
    const userData = verifyAcessToken(accessToken);

    if (!userData) {
      throw new Error();
    }

    req.user = userData;
    next();
  } catch (err) {
    res.status(401).json({ message: "invalid token" });
  }
};
