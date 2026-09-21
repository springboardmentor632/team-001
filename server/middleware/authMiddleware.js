const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    console.log("\n========== AUTH CHECK ==========");

    let token;

    console.log(
      "Authorization Header:",
      req.headers.authorization
    );

    // Get token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token =
        req.headers.authorization.split(" ")[1];
    }

    console.log("Extracted Token:", token);

    // Check if token exists
    if (!token) {
      console.log("❌ No Token Found");

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

    console.log("✅ Decoded JWT:", decoded);

    // Get user from database
    const user = await User.findById(
      decoded.id
    ).select("-password");

    if (!user) {
      console.log(
        "❌ User Not Found:",
        decoded.id
      );

      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });
    }

    console.log("✅ User Found:", user);

    req.user = user;

    console.log(
      "✅ Authentication Success"
    );
    console.log(
      "================================\n"
    );

    next();

  } catch (error) {

    console.log(
      "❌ AUTH ERROR:",
      error.name
    );

    console.log(
      "❌ AUTH MESSAGE:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Token Failed",
      error: error.message
    });
  }
};