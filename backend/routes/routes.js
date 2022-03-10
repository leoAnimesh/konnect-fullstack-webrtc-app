const router = require("express").Router();
const {
  sendOtpController,
  verifyOtpController,
} = require("../controllers/authController");

router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);

module.exports = router;
