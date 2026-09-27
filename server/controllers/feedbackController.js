const Feedback = require("../models/Feedback");

const submitFeedback = async (req, res) => {
  try {
    const { rating, feedback } = req.body;

    if (!rating || !feedback) {
      return res.status(400).json({
        success: false,
        message: "Rating and feedback are required",
      });
    }

    const newFeedback = await Feedback.create({
      user: req.user._id,
      rating,
      feedback,
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    // Only Admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    const feedbacks = await Feedback.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      feedbacks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    await feedback.deleteOne();

    res.status(200).json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedback,
  deleteFeedback,
};