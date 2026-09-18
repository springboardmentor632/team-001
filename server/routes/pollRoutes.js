const express = require("express");
const router = express.Router();

const {
  createPoll,
  getAllPolls,
  getPollById,
  updatePoll,
  deletePoll,
  castVote,
  getPollResults,
  getTotalVotes,
  verifyPollAccess,
  getTotalPolls,
  removeVote,
  hasUserVoted
} = require("../controllers/pollController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// ======================
// PUBLIC ROUTES
// ======================

// Get All Polls
router.get("/", getAllPolls);

// Dashboard Stats
router.get("/votes/total", getTotalVotes);
router.get("/total", getTotalPolls);

// Get Single Poll
router.get("/:id", getPollById);

// Verify Private Poll Access
router.post("/:id/verify-access", verifyPollAccess);

// Poll Results
router.get("/:id/results", getPollResults);

// Check User Vote
router.get("/:pollId/user/:userId/voted", hasUserVoted);

// ======================
// USER / MODERATOR / ADMIN
// ======================

// Create Poll
router.post(
  "/",
  protect,
  authorizeRoles("user", "moderator", "admin"),
  createPoll
);

// Cast Vote
router.post(
  "/vote/cast",
  protect,
  authorizeRoles("user", "moderator", "admin"),
  castVote
);

// Update Poll
router.put(
  "/:id",
  protect,
  authorizeRoles("user", "moderator", "admin"),
  updatePoll
);

// Delete Poll
router.delete(
  "/:id",
  protect,
  authorizeRoles("user", "moderator", "admin"),
  deletePoll
);

// ======================
// MODERATOR / ADMIN ONLY
// ======================

// Remove Vote
router.delete(
  "/vote/:voteId",
  protect,
  authorizeRoles("moderator", "admin"),
  removeVote
);

module.exports = router;