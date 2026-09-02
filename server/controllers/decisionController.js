const Decision = require("../models/Decision");

// Create Decision
exports.createDecision = async (req, res) => {
  try {
    const { title, description, teamId } = req.body;

    const decision = await Decision.create({
      title,
      description,
      team: teamId,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Decision Created Successfully",
      decision
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Team Decisions
exports.getTeamDecisions = async (req, res) => {
  try {
    const decisions = await Decision.find({
      team: req.params.teamId
    })
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      decisions
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};