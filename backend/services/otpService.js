const crypto = require("crypto");
const accountSid = process.env.SMS_ACCOUNT_SID;
const authToken = process.env.SMS_AUTH_TOKEN;
const twilio = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

//genrates a 4 digit otp
const generateOtp = async () => {
  return crypto.randomInt(1000, 9999);
};

//returns a hash of the otp
const hashOtp = async (data) => {
  return crypto
    .createHmac("sha256", process.env.OTP_HASH_KEY)
    .update(data)
    .digest("hex");
};

const sendViaSms = async (phone, otp) => {
  return await twilio.messages.create({
    to: phone,
    from: process.env.SMS_PHONE_NUMBER,
    body: `Konnect app one time password : ${otp} `,
  });
};

const verifyOtp = async (hashedOtp, data) => {
  let computedHash = await hashOtp(data);
  return hashedOtp === computedHash;
};

module.exports = {
  generateOtp,
  hashOtp,
  sendViaSms,
  verifyOtp,
};
