const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  getAllUsers,
  updateUserRole
} = require("../controllers/userController");

const {
  protect
} = require("../middleware/authMiddleware");

const {
  authorizeRoles
} = require("../middleware/roleMiddleware");

// ======================
// USER ROUTES
// ======================

// Get Profile
router.get(
  "/profile",
  protect,
  authorizeRoles("user", "moderator", "admin"),
  getProfile
);

// Update Profile
router.put(
  "/profile",
  protect,
  authorizeRoles("user", "moderator", "admin"),
  updateProfile
);

// Change Password
router.put(
  "/change-password",
  protect,
  authorizeRoles("user", "moderator", "admin"),
  changePassword
);

// Delete Account
router.delete(
  "/delete-account",
  protect,
  authorizeRoles("user", "moderator", "admin"),
  deleteAccount
);

// ======================
// ADMIN ROUTES
// ======================

// Get All Users
router.get(
  "/all-users",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

// Update User Role
router.put(
  "/update-role",
  protect,
  authorizeRoles("admin"),
  updateUserRole
);

module.exports = router;