const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
{
  communityId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Community"
  },

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  content:{
    type:String,
    default:""
  },

  image:{
    type:String,
    default:""
  },

  file:{
    type:String,
    default:""
  },

  likes:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
  ],

  isPinned:{
    type:Boolean,
    default:false
  },

  isAnnouncement:{
    type:Boolean,
    default:false
  }

},
{
  timestamps:true
});

module.exports =
mongoose.model(
  "CommunityPost",
  postSchema
);