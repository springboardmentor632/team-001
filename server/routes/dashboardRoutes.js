const express = require("express");
<<<<<<< HEAD

const {
  getDashboardStats,
  getRecentDecisions,
  getDashboardAnalytics,
  getVotingParticipation,
  getVoteDistribution,
  getDecisionTrends
} = require("../controllers/dashboardController");

const router = express.Router();

router.get(
  "/stats",
  getDashboardStats
);

router.get(
  "/recent-decisions",
  getRecentDecisions
);

router.get(
  "/analytics",
  getDashboardAnalytics
);

router.get(
  "/voting-participation",
  getVotingParticipation
);

router.get(
  "/vote-distribution",
  getVoteDistribution
);
router.get(
  "/decision-trends",
  getDecisionTrends
);

=======
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

router.get(
  "/stats",
  protect,
  getDashboardStats
);

>>>>>>> origin/develop
module.exports = router;