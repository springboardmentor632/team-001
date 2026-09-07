const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  workspaceDescription: {
    type: String,
    default: ""
  }
},
{
  timestamps: true
}
);

module.exports =
mongoose.model("Team", teamSchema);