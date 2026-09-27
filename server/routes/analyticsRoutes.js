const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Poll = require("../models/Poll");
const Vote = require("../models/Vote");
const Community = require("../models/Community");
const CommunityPost = require("../models/CommunityPost");

router.get("/", async (req, res) => {
  try {

    const users = await User.countDocuments();
    const polls = await Poll.countDocuments();
    const votes = await Vote.countDocuments();
    const communities = await Community.countDocuments();

    // Voting Trend
    const voteTrendRaw = await Vote.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          votes: { $sum: 1 }
        }
      },
      { $sort: { "_id.month": 1 } }
    ]);

    const months = [
      "", "Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug",
      "Sep", "Oct", "Nov", "Dec"
    ];

    const voteTrend = voteTrendRaw.map(item => ({
      month: months[item._id.month],
      votes: item.votes
    }));

    // Community Activity
    const communityData = await Community.find()
      .select("name totalMembers totalPosts");

    const communitiesChart = communityData.map(c => ({
      name: c.name,
      members: c.totalMembers || 0,
      posts: c.totalPosts || 0
    }));

    // Top Polls
    const topPolls = await Poll.aggregate([
      {
        $lookup: {
          from: "votes",
          localField: "_id",
          foreignField: "poll",
          as: "votes"
        }
      },
      {
        $project: {
          title: 1,
          voteCount: { $size: "$votes" }
        }
      },
      {
        $sort: { voteCount: -1 }
      },
      {
        $limit: 5
      }
    ]);

    // Recent Activity
    const recentVotes = await Vote.find()
      .populate("user", "name")
      .populate("poll", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    const activities = recentVotes.map(v => ({
      user: v.user?.name || "User",
      action: `voted in ${v.poll?.title}`,
      time: v.createdAt
    }));

    res.json({
      overview: {
        users,
        polls,
        votes,
        communities
      },
      voteTrend,
      communities: communitiesChart,
      topPolls,
      activities
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;