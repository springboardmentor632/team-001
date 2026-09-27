const UserActivity =
require("../models/UserActivity");

exports.addActivity =
async(
userId,
action,
title
)=>{
  try{

    await UserActivity.create({
      userId,
      action,
      title
    });

  }catch(err){
    console.log(err);
  }
};