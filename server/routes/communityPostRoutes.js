const express = require("express");
const router = express.Router();
const {
  getLeaderboard,
  pinPost,
  makeAnnouncement
} = require("../controllers/communityPostController");
const {
  createPost,
  getPosts,
  likePost,
  deletePost
} = require("../controllers/communityPostController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
router.post(
  "/:communityId/post",
  protect,
  upload.fields([
    {
      name: "image",
      maxCount: 1
    },
    {
      name: "file",
      maxCount: 1
    }
  ]),
  createPost
);

router.get(
  "/:communityId/posts",
  protect,
  getPosts
);

router.put(
  "/like/:postId",
  protect,
  likePost
);

router.delete(
  "/:postId",
  protect,
  deletePost
);
router.get(
  "/leaderboard/:communityId",
  protect,
  getLeaderboard
);
router.put(
  "/pin/:postId",
  protect,
  pinPost
);
router.put(
  "/announcement/:postId",
  protect,
  makeAnnouncement
);
module.exports = router;