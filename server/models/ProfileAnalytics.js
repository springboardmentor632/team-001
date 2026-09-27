const mongoose = require("mongoose");

const profileAnalyticsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    decisionsCreated: {
      type: Number,
      default: 0,
    },

    completedDecisions: {
      type: Number,
      default: 0,
    },

    pollsCreated: {
      type: Number,
      default: 0,
    },

    votesCast: {
      type: Number,
      default: 0,
    },

    communitiesJoined: {
      type: Number,
      default: 0,
    },

    successRate: {
      type: Number,
      default: 0,
    },

    profileViews: {
      type: Number,
      default: 0,
    },

    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ProfileAnalytics",
  profileAnalyticsSchema
);