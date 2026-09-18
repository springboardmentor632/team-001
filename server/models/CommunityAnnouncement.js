const announcementSchema =
new mongoose.Schema({
 communityId:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"Community"
 },
 title:String,
 description:String,
 createdBy:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"User"
 }
},{
 timestamps:true
});