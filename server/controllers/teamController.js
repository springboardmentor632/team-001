const Team = require("../models/Team");

// Create Team
exports.createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    const team = await Team.create({
      name,
      description,
      leader: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json({
      success: true,
      message: "Team Created Successfully",
      team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Teams
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("leader", "name email")
      .populate("members", "name email");

    res.status(200).json({
      success: true,
      teams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Teams
exports.getMyTeams = async (req, res) => {
  try {
    const teams = await Team.find({
      members: req.user._id,
    })
      .populate("leader", "name email")
      .populate("members", "name email");

    res.status(200).json({
      success: true,
      teams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};