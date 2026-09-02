const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Get token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, No Token"
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Get user from database
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });
    }

    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token Failed",
      error: error.message
    });
  }
};