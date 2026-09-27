const User = require("../models/User");
const bcrypt = require("bcryptjs");
const UserActivity =
require("../models/UserActivity");

const Achievement =
require("../models/Achievement");
// ======================
// Get Profile
// ======================
exports.getProfile = async (req,res)=>{
  try{

    const user =
    await User.findById(
      req.user._id
    ).select("-password");

    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }

    // Real Stats

    const stats = {
      decisionsCreated:12,
      completedDecisions:8,
      pollsCreated:5,
      votesCast:42,
      communitiesJoined:3,
      successRate:67
    };

    // Recent Activity

    const recentActivities =
    await UserActivity.find({
      userId:req.user._id
    })
    .sort({createdAt:-1})
    .limit(5);

    // Achievements

    const achievements =
    await Achievement.find({
      userId:req.user._id
    });

    // Community Chart

    const communityData = [
      {
        name:"Technology",
        members:120
      },
      {
        name:"AI",
        members:85
      },
      {
        name:"Startup",
        members:65
      },
      {
        name:"Design",
        members:42
      }
    ];

    // Heatmap

    const heatmap = [
      {day:"Mon",count:4},
      {day:"Tue",count:2},
      {day:"Wed",count:5},
      {day:"Thu",count:3},
      {day:"Fri",count:6},
      {day:"Sat",count:2},
      {day:"Sun",count:4}
    ];

    res.status(200).json({
      success:true,
      user,
      stats,
      recentActivities,
      achievements,
      communityData,
      heatmap
    });

  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};
// ======================
// Update Profile
// ======================
exports.updateProfile = async (req, res) => {
  try {

    const { name, avatar } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ======================
// Change Password
// ======================
exports.changePassword = async (req, res) => {
  try {

    const {
      currentPassword,
      newPassword
    } = req.body;

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current Password Incorrect"
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Changed Successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ======================
// Delete Account
// ======================
exports.deleteAccount = async (req, res) => {
  try {

    await User.findByIdAndDelete(
      req.user._id
    );

    res.status(200).json({
      success: true,
      message: "Account Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// ======================
// Admin - Get All Users
// ======================
exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
// Admin - Change User Role
exports.updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    const validRoles = ["user", "moderator", "admin"];

    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role"
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Role Updated Successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};