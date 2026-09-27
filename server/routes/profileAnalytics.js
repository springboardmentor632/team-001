const express = require("express");

const router = express.Router();

const {
  getProfileAnalytics,
} = require(
  "../controllers/profileAnalyticsController"
);

const {
  protect,
} = require("../middleware/authMiddleware");

router.get(
  "/",
  protect,
  getProfileAnalytics
);

module.exports = router;