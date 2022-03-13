const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    phone: { type: String, required: true },
    name: { type: String, required: false },
    avatar: { type: String, require: false },
    activated: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema, "users");
