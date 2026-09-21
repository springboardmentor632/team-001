const mongoose = require("mongoose");

const optionComparisonSchema = new mongoose.Schema(
{
  decisionId: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  options: [
    {
      name: {
        type: String,
        required: true
      },

      cost: {
        type: String,
        default: ""
      },

      scalability: {
        type: String,
        default: ""
      },

      security: {
        type: String,
        default: ""
      },

      performance: {
        type: String,
        default: ""
      },

      description: {
        type: String,
        default: ""
      }
    }
  ]
},
{
  timestamps: true
}
);

module.exports = mongoose.model(
  "OptionComparison",
  optionComparisonSchema
);