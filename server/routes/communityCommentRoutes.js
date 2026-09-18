const express = require("express");

const router = express.Router();

const {
createComment,
getComments,
deleteComment
} = require(
"../controllers/communityCommentController"
);

const {
protect
} = require(
"../middleware/authMiddleware"
);

router.post(
"/:postId",
protect,
createComment
);

router.get(
"/:postId",
protect,
getComments
);

router.delete(
"/:commentId",
protect,
deleteComment
);

module.exports = router;