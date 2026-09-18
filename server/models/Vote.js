const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
    {
        poll: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Poll",
            required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        selectedOptions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            }
        ],

        rating: {
            type: Number,
            min: 1,
            max: 5
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Vote", voteSchema);