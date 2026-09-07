const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createTeam,
  getTeams,
  getMyTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  joinTeam,
  leaveTeam,
  getTotalTeams,
  addMember,
  removeMember
} = require("../controllers/teamController");

/*
=========================================
TEAM ROUTES
=========================================
*/

// Create Team
router.post(
  "/create",
  protect,
  createTeam
);

// Get All Teams
router.get(
  "/",
  protect,
  getTeams
);

// Get My Teams
router.get(
  "/my-teams",
  protect,
  getMyTeams
);

// Get Team Details
router.get(
  "/:id",
  protect,
  getTeamById
);

// Update Team
router.put(
  "/:id",
  protect,
  updateTeam
);

// Delete Team
router.delete(
  "/:id",
  protect,
  deleteTeam
);

// Join Team
router.post(
  "/:id/join",
  protect,
  joinTeam
);

// Leave Team
router.post(
  "/:id/leave",
  protect,
  leaveTeam
);

// Add Member By Email
router.post(
  "/add-member",
  protect,
  addMember
);

// Remove Member
router.post(
  "/remove-member",
  protect,
  removeMember
);

// Total Teams Count
router.get(
  "/stats/total",
  protect,
  getTotalTeams
);

module.exports = router;