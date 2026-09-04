const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        question: {
            type: String,
            required: true,
            trim: true
        },

        options: [
            {
                text: {
                    type: String,
                    required: true,
                    trim: true
                }
            }
        ],

        pollType: {
            type: String,
            enum: ["single", "multiple", "rating"],
            default: "single"
        },

        visibility: {
            type: String,
            enum: ["public", "private"],
            default: "public"
        },

        anonymous: {
            type: Boolean,
            default: false
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        startDate: {
            type: Date,
            default: Date.now
        },

        endDate: {
            type: Date
        },

        isActive: {
            type: Boolean,
            default: true
        },

        accessCode: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Poll", pollSchema);