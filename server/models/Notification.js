const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    poll:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Poll"
    },

    title:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true
    },

    type:{
        type:String,
        enum: [
            "poll",
            "vote",
            "comment",
            "team",
            "community"
        ]
    },

    isRead:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
}
);

module.exports =
mongoose.model(
    "Notification",
    notificationSchema
);