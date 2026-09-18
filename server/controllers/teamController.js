const Team = require("../models/Team");
const Notification = require("../models/Notification");
const User = require("../models/User");
/*
=========================================
CREATE TEAM
=========================================
*/
exports.createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Team name is required"
      });
    }

    const existingTeam = await Team.findOne({
      name: name.trim()
    });

    if (existingTeam) {
      return res.status(400).json({
        success: false,
        message: "Team already exists"
      });
    }

    const team = await Team.create({
      name,
      description,
      leader: req.user._id,
      members: [req.user._id]
    });

    await Notification.create({
      user: req.user._id,
      title: "Team Created",
      message: `Team "${team.name}" created successfully`,
      type: "team"
    });

    res.status(201).json({
      success: true,
      message: "Team created successfully",
      team
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
GET ALL TEAMS
=========================================
*/
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("leader", "name email")
      .populate("members", "name email");

    res.status(200).json({
      success: true,
      count: teams.length,
      teams
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
GET MY TEAMS
=========================================
*/
exports.getMyTeams = async (req, res) => {
  try {

    const teams = await Team.find({
      members: req.user._id
    })
      .populate("leader", "name email")
      .populate("members", "name email");

    res.status(200).json({
      success: true,
      count: teams.length,
      teams
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
GET TEAM BY ID
=========================================
*/
exports.getTeamById = async (req, res) => {
  try {

    const team = await Team.findById(req.params.id)
      .populate("leader", "name email")
      .populate("members", "name email");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    res.status(200).json({
      success: true,
      team
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
UPDATE TEAM
=========================================
*/
exports.updateTeam = async (req, res) => {
  try {

    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    if (team.leader.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only team leader can update team"
      });
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: "Team updated successfully",
      team: updatedTeam
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
JOIN TEAM
=========================================
*/
exports.joinTeam = async (req, res) => {
  try {

    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    const alreadyMember = team.members.some(
      member =>
        member.toString() ===
        req.user._id.toString()
    );

    if (alreadyMember) {
      return res.status(400).json({
        success: false,
        message: "Already a member"
      });
    }

    team.members.push(req.user._id);

    await team.save();

    res.status(200).json({
      success: true,
      message: "Joined team successfully",
      team
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
LEAVE TEAM
=========================================
*/
exports.leaveTeam = async (req, res) => {
  try {

    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }
    if (
      team.leader.toString() ===
      req.user._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Team leader cannot leave team"
      });
    }
    team.members = team.members.filter(
      member =>
        member.toString() !== req.user._id.toString()
    );

    await team.save();

    res.status(200).json({
      success: true,
      message: "Left team successfully"
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
DELETE TEAM
=========================================
*/
exports.deleteTeam = async (req, res) => {
  try {

    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    if (
      team.leader.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    await Team.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Team deleted successfully"
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
TOTAL TEAM COUNT
=========================================
*/
exports.getTotalTeams = async (req, res) => {
  try {

    const totalTeams = await Team.countDocuments();

    res.status(200).json({
      success: true,
      totalTeams
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
//Remove Member Feature.
exports.removeMember = async (req, res) => {
  try {

    const { teamId, memberId } = req.body;

    const team =
      await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    if (
      team.leader.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Only leader can remove members"
      });
    }

    team.members =
      team.members.filter(
        member =>
          member.toString() !== memberId
      );

    await team.save();

    res.json({
      success: true,
      message:
        "Member removed successfully"
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
ADD MEMBER BY EMAIL
=========================================
*/
exports.addMember = async (req, res) => {
  try {
    const { teamId, email } = req.body;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    // Only leader can add members
    if (
      team.leader.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Only team leader can add members"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const alreadyMember =
      team.members.includes(user._id);

    if (alreadyMember) {
      return res.status(400).json({
        success: false,
        message: "User already in team"
      });
    }

    team.members.push(user._id);

    await team.save();

    // Notification
    await Notification.create({
      user: user._id,
      title: "Team Invitation",
      message: `You have been added to team "${team.name}"`,
      type: "team"
    });

    res.status(200).json({
      success: true,
      message: "Member added successfully",
      team
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};