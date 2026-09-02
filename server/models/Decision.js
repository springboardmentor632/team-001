const mongoose = require("mongoose");

const decisionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Decision",
  decisionSchema
);