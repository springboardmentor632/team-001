const User = require("../models/User");
const Team = require("../models/Team");
const Decision = require("../models/Decision");
const Poll = require("../models/Poll");
const Vote = require("../models/Vote");

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalTeams,
      totalDecisions,
      totalPolls,
      totalVotes
    ] = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Decision.countDocuments(),
      Poll.countDocuments(),
      Vote.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      stats: {
        users: totalUsers,
        teams: totalTeams,
        decisions: totalDecisions,
        polls: totalPolls,
        votes: totalVotes
      }
    });

  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics"
    });
  }
};
const getRecentDecisions = async (req, res) => {
  try {
    const decisions = await Decision.find()
      .populate("team", "name")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      decisions
    });

  } catch (error) {
    console.error("Recent decisions error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recent decisions"
    });
  }
};
const getDashboardAnalytics = async (req, res) => {
  try {
    const [
      openDecisions,
      closedDecisions,
      activePolls,
      inactivePolls
    ] = await Promise.all([
      Decision.countDocuments({ status: "open" }),
      Decision.countDocuments({ status: "closed" }),
      Poll.countDocuments({ isActive: true }),
      Poll.countDocuments({ isActive: false })
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        openDecisions,
        closedDecisions,
        activePolls,
        inactivePolls
      }
    });

  } catch (error) {
    console.error("Dashboard analytics error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard analytics"
    });
  }
};
const getVotingParticipation = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalVotes = await Vote.countDocuments();

    const uniqueVoters = await Vote.distinct("user", {
      user: { $ne: null }
    });

    const participationRate =
      totalUsers > 0
        ? ((uniqueVoters.length / totalUsers) * 100).toFixed(1)
        : 0;

    res.status(200).json({
      success: true,
      participation: {
        totalVotes,
        uniqueVoters: uniqueVoters.length,
        totalUsers,
        participationRate: Number(participationRate)
      }
    });

  } catch (error) {
    console.error(
      "Voting participation error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch voting participation"
    });
  }
};
const getVoteDistribution = async (req, res) => {
  try {
    const polls = await Poll.find()
      .select("title options")
      .lean();

    const distribution = [];

    for (const poll of polls) {

      const votes = await Vote.find({
        poll: poll._id
      }).lean();

      const optionCounts = {};

      poll.options.forEach((option) => {
        optionCounts[option._id.toString()] = {
          optionId: option._id,
          text: option.text,
          votes: 0
        };
      });

      votes.forEach((vote) => {

        if (vote.selectedOptions) {

          vote.selectedOptions.forEach(
            (selectedOption) => {

              const optionId =
                selectedOption.toString();

              if (optionCounts[optionId]) {
                optionCounts[optionId].votes += 1;
              }

            }
          );

        }

      });

      distribution.push({
        pollId: poll._id,
        pollTitle: poll.title,
        options: Object.values(optionCounts)
      });

    }

    res.status(200).json({
      success: true,
      distribution
    });

  } catch (error) {

    console.error(
      "Vote distribution error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch vote distribution"
    });

  }
};
const getDecisionTrends = async (req, res) => {
  try {
    const trends = await Decision.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      trends
    });

  } catch (error) {
    console.error("Decision trends error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch decision trends"
    });
  }
};
module.exports = {
  getDashboardStats,
  getRecentDecisions,
  getDashboardAnalytics,
  getVotingParticipation,
  getVoteDistribution,
  getDecisionTrends
};