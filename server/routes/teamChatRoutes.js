const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  sendMessage,
  getTeamMessages
} = require("../controllers/teamChatController");

router.post(
  "/:teamId/send",
  protect,
  sendMessage
);

router.get(
  "/:teamId/messages",
  protect,
  getTeamMessages
);

module.exports = router;