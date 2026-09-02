const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    default: "",
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  avatar: {
    type: String,
    default: "",
  },

  // ======================
  // Email Verification
  // ======================
  isVerified: {
    type: Boolean,
    default: false,
  },

  verificationCode: {
    type: String,
    default: null,
  },

  verificationCodeExpires: {
    type: Date,
    default: null,
  },

  // ======================
  // Google Login
  // ======================
  googleId: {
    type: String,
    default: null,
  },

  // ======================
  // Forgot Password
  // ======================
  resetPasswordToken: {
    type: String,
    default: null,
  },

  resetPasswordExpires: {
    type: Date,
    default: null,
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);