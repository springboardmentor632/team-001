const express = require("express");

const router = express.Router();

const {
  createComparison,
  getComparison,
  getAllComparisons,
  updateComparison,
  deleteComparison
} = require(
  "../controllers/optionComparisonController"
);

const {
  protect
} = require("../middleware/authMiddleware");

/*
=========================================
CREATE COMPARISON
=========================================
*/
router.post(
  "/",
  protect,
  createComparison
);

/*
=========================================
GET ALL COMPARISONS
=========================================
*/
router.get(
  "/",
  protect,
  getAllComparisons
);

/*
=========================================
GET COMPARISON BY DECISION ID
=========================================
*/
router.get(
  "/:decisionId",
  protect,
  getComparison
);

/*
=========================================
UPDATE COMPARISON
=========================================
*/
router.put(
  "/:id",
  protect,
  updateComparison
);

/*
=========================================
DELETE COMPARISON
=========================================
*/
router.delete(
  "/:id",
  protect,
  deleteComparison
);

module.exports = router;