const ProfileAnalytics = require(
  "../models/ProfileAnalytics"
);

exports.getProfileAnalytics = async (
  req,
  res
) => {
  try {
    let analytics =
      await ProfileAnalytics.findOne({
        user: req.user._id,
      });

    if (!analytics) {
      analytics =
        await ProfileAnalytics.create({
          user: req.user._id,
        });
    }

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};