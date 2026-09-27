const mongoose = require("mongoose");

const achievementSchema =
new mongoose.Schema(
{
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  title:String,

  icon:String
},
{
  timestamps:true
}
);

module.exports =
mongoose.model(
  "Achievement",
  achievementSchema
);