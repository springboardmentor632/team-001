const Team = require("../models/Team");
const Poll = require("../models/Poll");
const Vote = require("../models/Vote");
const User = require("../models/User");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalTeams = await Team.countDocuments();
    const totalPolls = await Poll.countDocuments();
    const totalVotes = await Vote.countDocuments();
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      totalTeams,
      totalPolls,
      totalVotes,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};