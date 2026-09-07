const CommunityPost = require("../models/CommunityPost");
const Community = require("../models/Community");
const mongoose = require("mongoose");
const User = require("../models/User");
const upload = require("../middleware/uploadMiddleware");
/*
=========================================
CREATE POST
=========================================
*/
exports.createPost = async (req, res) => {
  try {

    const community = await Community.findById(
      req.params.communityId
    );

    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Community not found"
      });
    }

    const post = await CommunityPost.create({
        communityId: req.params.communityId,

        userId: req.user._id,

        content: req.body.content,

        isPinned:
            req.body.isPinned || false,

        isAnnouncement:
            req.body.isAnnouncement || false,

        image:
            req.files?.image?.[0]
            ? `/uploads/${req.files.image[0].filename}`
            : "",

        file:
            req.files?.file?.[0]
            ? `/uploads/${req.files.file[0].filename}`
            : ""
    });

    community.totalPosts += 1;
    await community.save();

    const populatedPost =
      await CommunityPost.findById(post._id)
        .populate("userId", "name email");

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: populatedPost
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

/*
=========================================
GET ALL POSTS
=========================================
*/
exports.getPosts = async (req, res) => {
  try {

    const posts = await CommunityPost.find({
      communityId: req.params.communityId
    })
      .populate("userId", "name email")
      .sort({
            isPinned: -1,
            createdAt: -1
        });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

/*
=========================================
LIKE / UNLIKE POST
=========================================
*/
exports.likePost = async (req, res) => {
  try {

    const post = await CommunityPost.findById(
      req.params.postId
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    const alreadyLiked =
      post.likes.some(
        id =>
          id.toString() ===
          req.user._id.toString()
      );

    if (alreadyLiked) {

      post.likes = post.likes.filter(
        id =>
          id.toString() !==
          req.user._id.toString()
      );

    } else {

      post.likes.push(req.user._id);

    }

    await post.save();

    res.status(200).json({
      success: true,
      likes: post.likes.length,
      liked: !alreadyLiked
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

/*
=========================================
DELETE POST
=========================================
*/
exports.deletePost = async (req, res) => {
  try {

    const post = await CommunityPost.findById(
      req.params.postId
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    const isOwner =
      post.userId.toString() ===
      req.user._id.toString();

    const isAdmin =
      req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "Not authorized to delete this post"
      });
    }

    await CommunityPost.findByIdAndDelete(
      req.params.postId
    );

    res.status(200).json({
      success: true,
      message: "Post deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.getLeaderboard = async (req, res) => {
  try {

    const leaderboard =
      await CommunityPost.aggregate([

        {
          $match: {
            communityId:
              new mongoose.Types.ObjectId(
                req.params.communityId
              )
          }
        },

        {
          $group: {
            _id: "$userId",
            totalPosts: {
              $sum: 1
            }
          }
        },

        {
          $sort: {
            totalPosts: -1
          }
        },

        {
          $limit: 5
        }
      ]);

    await User.populate(
      leaderboard,
      {
        path: "_id",
        select: "name"
      }
    );

    res.status(200).json({
      success: true,
      leaderboard
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.pinPost = async (req, res) => {
  try {

    const post = await CommunityPost.findById(
      req.params.postId
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    // Only Admin or Moderator
    if (
      req.user.role !== "admin" &&
      req.user.role !== "moderator"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Only Admin or Moderator can pin posts"
      });
    }

    // Remove previous pinned post
    await CommunityPost.updateMany(
      {
        communityId: post.communityId
      },
      {
        isPinned: false
      }
    );

    // Pin selected post
    post.isPinned = true;

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post pinned successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.makeAnnouncement = async (
  req,
  res
) => {
  try {

    const post =
      await CommunityPost.findById(
        req.params.postId
      );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    post.isAnnouncement =
      !post.isAnnouncement;

    await post.save();

    res.status(200).json({
      success: true,
      isAnnouncement:
        post.isAnnouncement
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};