const Team = require("../models/Team");
const TeamMessage = require("../models/TeamMessage");

/*
=================================
SEND MESSAGE
=================================
*/

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    const team = await Team.findById(req.params.teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    const isMember = team.members.some(
      member =>
        member.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "Join team first"
      });
    }

    const newMessage = await TeamMessage.create({
      team: req.params.teamId,
      sender: req.user._id,
      message
    });

    const populatedMessage =
      await TeamMessage.findById(newMessage._id)
        .populate("sender", "name email avatar");

    res.status(201).json({
      success: true,
      message: populatedMessage
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/*
=================================
GET TEAM CHAT
=================================
*/

exports.getTeamMessages = async (req, res) => {
  try {

    const team = await Team.findById(req.params.teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    const messages = await TeamMessage.find({
      team: req.params.teamId
    })
      .populate("sender", "name email avatar")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};