const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createDecision,
  getTeamDecisions
} = require("../controllers/decisionController");

router.post("/create", protect, createDecision);

router.get(
  "/team/:teamId",
  protect,
  getTeamDecisions
);

module.exports = router;