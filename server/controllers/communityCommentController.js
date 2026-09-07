const CommunityComment =
require("../models/CommunityComment");

exports.createComment =
async(req,res)=>{
try{

const comment =
await CommunityComment.create({
    postId:req.params.postId,
    userId:req.user._id,
    text:req.body.text
});

res.status(201).json({
    success:true,
    comment
});

}catch(error){
res.status(500).json({
success:false,
message:error.message
});
}
};

exports.getComments =
async(req,res)=>{
try{

const comments =
await CommunityComment.find({
postId:req.params.postId
})
.populate("userId","name")
.sort({createdAt:-1});

res.status(200).json({
success:true,
comments
});

}catch(error){
res.status(500).json({
success:false,
message:error.message
});
}
};

exports.deleteComment =
async(req,res)=>{
try{

const comment =
await CommunityComment.findById(
req.params.commentId
);

if(!comment){
return res.status(404).json({
success:false,
message:"Comment not found"
});
}

if(
comment.userId.toString() !==
req.user._id.toString()
){
return res.status(403).json({
success:false,
message:"Not authorized"
});
}

await comment.deleteOne();

res.status(200).json({
success:true,
message:"Comment deleted"
});

}catch(error){
res.status(500).json({
success:false,
message:error.message
});
}
};