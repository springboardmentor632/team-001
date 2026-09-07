const express = require("express");
const router = express.Router();

const {
  createCommunity,
  getCommunities,
  getCommunityById,
  joinCommunity,
  leaveCommunity,
  updateCommunity,
  deleteCommunity,
  addModerator,
  removeModerator,
  getCommunityStats
} = require("../controllers/communityController");

const { protect } = require("../middleware/authMiddleware");

const {
  authorizeRoles
} = require("../middleware/roleMiddleware");

/*
===================================
COMMUNITY ROUTES
===================================
*/

/*
===================================
CREATE COMMUNITY
(Admin + Moderator)
===================================
*/
router.post(
  "/create",
  protect,
  authorizeRoles("admin", "moderator"),
  createCommunity
);

/*
===================================
GET ALL COMMUNITIES
===================================
*/
router.get(
  "/",
  protect,
  getCommunities
);

/*
===================================
COMMUNITY STATS
===================================
*/
router.get(
  "/stats",
  protect,
  getCommunityStats
);

/*
===================================
GET COMMUNITY BY ID
===================================
*/
router.get(
  "/:id",
  protect,
  getCommunityById
);

/*
===================================
JOIN COMMUNITY
===================================
*/
router.post(
  "/:id/join",
  protect,
  joinCommunity
);

/*
===================================
LEAVE COMMUNITY
===================================
*/
router.post(
  "/:id/leave",
  protect,
  leaveCommunity
);

/*
===================================
UPDATE COMMUNITY
(Owner Only - Checked in Controller)
===================================
*/
router.put(
  "/:id",
  protect,
  updateCommunity
);

/*
===================================
DELETE COMMUNITY
(Admin Only)
===================================
*/
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteCommunity
);

/*
===================================
ADD MODERATOR
(Owner Only)
===================================
*/
router.post(
  "/add-moderator",
  protect,
  addModerator
);

/*
===================================
REMOVE MODERATOR
(Owner Only)
===================================
*/
router.post(
  "/remove-moderator",
  protect,
  removeModerator
);

module.exports = router;