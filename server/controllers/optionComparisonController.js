const OptionComparison = require("../models/OptionComparison");

/*
=========================================
CREATE COMPARISON
=========================================
*/
exports.createComparison = async (req, res) => {
  try {

    console.log("========== CREATE COMPARISON ==========");
    console.log("REQUEST BODY:");
    console.log(JSON.stringify(req.body, null, 2));

    const { decisionId, title, options } = req.body;

    if (!decisionId) {
      return res.status(400).json({
        success: false,
        message: "decisionId is required"
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "title is required"
      });
    }

    if (!options || options.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one option is required"
      });
    }

    const comparison = await OptionComparison.create({
      decisionId,
      title,
      options
    });

    console.log("COMPARISON CREATED:");
    console.log(comparison);

    res.status(201).json({
      success: true,
      message: "Comparison created successfully",
      comparison
    });

  } catch (error) {

    console.error("CREATE COMPARISON ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    });

  }
};

/*
=========================================
GET COMPARISON BY DECISION ID
=========================================
*/
exports.getComparison = async (req, res) => {
  try {

    const comparison = await OptionComparison.findOne({
      decisionId: req.params.decisionId
    });

    if (!comparison) {
      return res.status(404).json({
        success: false,
        message: "Comparison not found"
      });
    }

    res.status(200).json({
      success: true,
      comparison
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

/*
=========================================
UPDATE COMPARISON
=========================================
*/
exports.updateComparison = async (req, res) => {
  try {

    const comparison = await OptionComparison.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!comparison) {
      return res.status(404).json({
        success: false,
        message: "Comparison not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Comparison updated successfully",
      comparison
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

/*
=========================================
DELETE COMPARISON
=========================================
*/
exports.deleteComparison = async (req, res) => {
  try {

    const comparison = await OptionComparison.findById(
      req.params.id
    );

    if (!comparison) {
      return res.status(404).json({
        success: false,
        message: "Comparison not found"
      });
    }

    await comparison.deleteOne();

    res.status(200).json({
      success: true,
      message: "Comparison deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

/*
=========================================
GET ALL COMPARISONS
=========================================
*/
exports.getAllComparisons = async (req, res) => {
  try {

    const comparisons = await OptionComparison.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comparisons.length,
      comparisons
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};