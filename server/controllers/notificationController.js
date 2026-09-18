const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
  try {

    const notifications =
      await Notification.find({
        user: req.user._id
      })
      .sort({ createdAt: -1 });

    res.json(notifications);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.markAsRead = async (req, res) => {
  try {

    const notification =
      await Notification.findByIdAndUpdate(
        req.params.id,
        { isRead: true },
        { new: true }
      );

    res.json(notification);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.deleteNotification = async (req, res) => {
  try {

    await Notification.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};