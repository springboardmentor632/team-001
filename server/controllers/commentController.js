const Comment = require("../models/Comment");
const Poll = require("../models/Poll");
const Notification = require("../models/Notification");

// ====================
// ADD COMMENT
// ====================
exports.addComment = async (req, res) => {
  try {
    const { pollId, userId, text } = req.body;

    // Debug Logs
    console.log("PollId Received:", pollId);

    // Validation
    if (!pollId || !userId || !text) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Find Poll
    const poll = await Poll.findById(pollId);

    console.log("Poll Found:", poll);

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "Poll not found"
      });
    }

    // Create Comment
    const comment = await Comment.create({
      poll: pollId,
      user: userId,
      text
    });

    // Populate User Details
    const populatedComment = await Comment.findById(comment._id)
      .populate("user", "name email");

    // Notification Debug Logs
    console.log("Poll Created By:", poll.createdBy);
    console.log("Comment User:", userId);

    // Create Notification
    if (
      poll.createdBy &&
      poll.createdBy.toString() !== userId
    ) {
      const notification = await Notification.create({
        user: poll.createdBy,
        title: "New Comment",
        message: `${populatedComment.user.name} commented on your poll`,
        type: "comment"
      });

      console.log("Notification Created:", notification);
    } else {
      console.log("Notification NOT created");
    }

    // Success Response
    res.status(201).json({
      success: true,
      comment: populatedComment
    });

  } catch (error) {
    console.log("ADD COMMENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// ====================
// GET COMMENTS
// ====================
exports.getComments = async (req, res) => {
  try {

    const comments = await Comment.find({
      poll: req.params.pollId
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);

  } catch (error) {

    console.log("GET COMMENTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ====================
// UPDATE COMMENT
// ====================
exports.updateComment = async (req, res) => {
  try {

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    const userId = req.user._id.toString();

    if (comment.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own comments"
      });
    }

    comment.text = req.body.text;

    await comment.save();

    res.status(200).json({
      success: true,
      comment
    });

  } catch (error) {

    console.log("UPDATE COMMENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ====================
// DELETE COMMENT
// ====================
exports.deleteComment = async (req, res) => {
  try {

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    const poll = await Poll.findById(comment.poll);

    const userId = req.user._id.toString();

    const isCommentOwner =
      comment.user.toString() === userId;

    const isPollOwner =
      poll &&
      poll.createdBy &&
      poll.createdBy.toString() === userId;

    const isAdmin =
      req.user.role === "admin";

    if (
      !isCommentOwner &&
      !isPollOwner &&
      !isAdmin
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully"
    });

  } catch (error) {

    console.log("DELETE COMMENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};