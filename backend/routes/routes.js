const router = require("express").Router();
const {
  sendOtpController,
  verifyOtpController,
  refreshController,
  logoutController,
} = require("../controllers/authController");
const { activateController } = require("../controllers/activateController");
const authMiddleware = require("../middlewares/authmiddleware");

router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);
router.post("/activate", authMiddleware, activateController);
router.get("/refresh", refreshController);
router.post("/logout", authMiddleware, logoutController);

module.exports = router;
