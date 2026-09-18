const Community = require("../models/Community");
const Notification = require("../models/Notification");
const User = require("../models/User");

/*
=========================================
CREATE COMMUNITY
=========================================
*/
exports.createCommunity = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      image
    } = req.body;

    const existingCommunity =
      await Community.findOne({ name });

    if (existingCommunity) {
      return res.status(400).json({
        success: false,
        message: "Community already exists"
      });
    }

    const community =
      await Community.create({
        name,
        description,
        category,
        image,
        createdBy: req.user._id,
        moderators: [req.user._id],
        members: [req.user._id],
        totalMembers: 1
      });

    await Notification.create({
      user: req.user._id,
      title: "Community Created",
      message: `${community.name} created successfully`,
      type: "community"
    });

    res.status(201).json({
      success: true,
      message: "Community created successfully",
      community
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
GET ALL COMMUNITIES
=========================================
*/
exports.getCommunities = async (req, res) => {
  try {

    const communities =
      await Community.find()
      .populate("createdBy", "name email")
      .populate("moderators", "name email")
      .populate("members", "name email");

    res.status(200).json({
      success: true,
      count: communities.length,
      communities
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
GET COMMUNITY BY ID
=========================================
*/
exports.getCommunityById = async (req, res) => {
  try {

    const community =
      await Community.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("moderators", "name email")
      .populate("members", "name email");

    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Community not found"
      });
    }

    res.status(200).json({
      success: true,
      community
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
JOIN COMMUNITY
=========================================
*/
exports.joinCommunity = async (req, res) => {
  try {

    const community =
      await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Community not found"
      });
    }

    const alreadyJoined =
      community.members.some(
        member =>
          member.toString() ===
          req.user._id.toString()
      );

    if (alreadyJoined) {
      return res.status(400).json({
        success: false,
        message: "Already joined"
      });
    }

    community.members.push(req.user._id);
    community.totalMembers =
      community.members.length;

    await community.save();

    res.status(200).json({
      success: true,
      message: "Joined community successfully"
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
LEAVE COMMUNITY
=========================================
*/
exports.leaveCommunity = async (req, res) => {
  try {

    const community =
      await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Community not found"
      });
    }

    community.members =
      community.members.filter(
        member =>
          member.toString() !==
          req.user._id.toString()
      );

    community.totalMembers =
      community.members.length;

    await community.save();

    res.status(200).json({
      success: true,
      message: "Left community successfully"
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
UPDATE COMMUNITY
=========================================
*/
exports.updateCommunity = async (req, res) => {
  try {

    const community =
      await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Community not found"
      });
    }

    if (
      community.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Only owner can update community"
      });
    }

    const updatedCommunity =
      await Community.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    res.status(200).json({
      success: true,
      message: "Community updated successfully",
      community: updatedCommunity
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
DELETE COMMUNITY
(Admin OR Community Owner)
=========================================
*/
exports.deleteCommunity = async (req, res) => {
  try {

    const community = await Community.findById(
      req.params.id
    );

    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Community not found"
      });
    }

    // Only Admin or Community Creator
    const isOwner =
      community.createdBy.toString() ===
      req.user._id.toString();

    const isAdmin =
      req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "Only community owner or admin can delete this community"
      });
    }

    // Delete Community
    await Community.findByIdAndDelete(
      req.params.id
    );

    // Create Notification
    await Notification.create({
      user: req.user._id,
      title: "Community Deleted",
      message: `${community.name} deleted successfully`,
      type: "community"
    });

    // Real-Time Notification
    if (global.io) {
      global.io.emit(
        "communityDeleted",
        {
          communityId: community._id,
          communityName: community.name
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Community deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/*
=========================================
ADD MODERATOR
=========================================
*/
exports.addModerator = async (req, res) => {
  try {

    const {
      communityId,
      email
    } = req.body;

    const community =
      await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Community not found"
      });
    }

    if (
      community.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Only owner can add moderators"
      });
    }

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    community.moderators.push(user._id);

    await community.save();

    res.status(200).json({
      success: true,
      message: "Moderator added successfully"
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
REMOVE MODERATOR
=========================================
*/
exports.removeModerator = async (req, res) => {
  try {

    const {
      communityId,
      userId
    } = req.body;

    const community =
      await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Community not found"
      });
    }

    if (
      community.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Only owner can remove moderators"
      });
    }

    community.moderators =
      community.moderators.filter(
        moderator =>
          moderator.toString() !== userId
      );

    await community.save();

    res.status(200).json({
      success: true,
      message: "Moderator removed successfully"
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
COMMUNITY STATS
=========================================
*/
exports.getCommunityStats = async (req, res) => {
  try {

    const totalCommunities =
      await Community.countDocuments();

    const totalMembers =
      await Community.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalMembers"
            }
          }
        }
      ]);

    res.status(200).json({
      success: true,
      totalCommunities,
      totalMembers:
        totalMembers[0]?.total || 0
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};