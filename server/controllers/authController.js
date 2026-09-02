const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// ======================
// Register User
// ======================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const code = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await User.create({
      name,
      email,
      password: hashedPassword,
      verificationCode: code,
      verificationCodeExpires: new Date(
        Date.now() + 10 * 60 * 1000
      ),
    });

    await sendEmail(
      email,
      "DecisionHub Email Verification",
      `
      <h2>DecisionHub</h2>
      <p>Your OTP Code:</p>
      <h1>${code}</h1>
      <p>Valid for 10 minutes</p>
      `
    );

    res.status(201).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================
// Login User
// ======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message:
          "Please verify your email first",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================
// Verify Email OTP
// ======================
exports.verifyEmail = async (req, res) => {
  try {

    console.log("REQ BODY:", req.body);

    const { email, code } = req.body;

    console.log("EMAIL:", email);
    console.log("CODE RECEIVED:", code);

    const user = await User.findOne({ email });

    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("DB OTP:", user.verificationCode);

    if (user.verificationCode !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.verificationCodeExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;

    await user.save();

    res.json({
      success: true,
      message: "Email Verified",
    });

  } catch (err) {

    console.log("VERIFY ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================
// Resend OTP
// ======================
exports.resendVerificationCode =
  async (req, res) => {
    try {
      const { email } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const code = Math.floor(
        100000 +
          Math.random() * 900000
      ).toString();

      user.verificationCode = code;

      user.verificationCodeExpires =
        new Date(
          Date.now() +
            10 * 60 * 1000
        );

      await user.save();

      await sendEmail(
        email,
        "DecisionHub OTP",
        `
        <h2>DecisionHub</h2>
        <h1>${code}</h1>
        <p>Valid for 10 minutes</p>
        `
      );

      res.json({
        success: true,
        message:
          "OTP Resent Successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

// ======================
// Google Login
// ======================
exports.googleLogin = async (
  req,
  res
) => {
  try {
    const {
      email,
      name,
      googleId,
    } = req.body;

    let user =
      await User.findOne({
        email,
      });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        isVerified: true,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// ======================
// Forgot Password
// ======================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.resetPasswordToken = otp;

    user.resetPasswordExpires =
      new Date(
        Date.now() + 10 * 60 * 1000
      );

    await user.save();

    await sendEmail(
      email,
      "DecisionHub Password Reset",
      otp
    );

    res.json({
      success: true,
      message:
        "Password reset OTP sent to email",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
// ======================
// Reset Password
// ======================
exports.resetPassword = async (req, res) => {
  try {

    const {
      email,
      otp,
      newPassword,
    } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (
      user.resetPasswordToken !== otp
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (
      user.resetPasswordExpires <
      new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password =
      hashedPassword;

    user.resetPasswordToken = null;

    user.resetPasswordExpires =
      null;

    await user.save();

    res.json({
      success: true,
      message:
        "Password Reset Successful",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};