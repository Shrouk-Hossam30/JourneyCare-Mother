import ExercisePlan from "../models/ExercisePlan.js";

// Create (admin only)
export const createExercisePlan = async (req, res) => {
  try {
    const plan = await ExercisePlan.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Exercise plan created successfully",
      data: plan,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all plans (admin view)
export const getAllExercisePlans = async (req, res) => {
  try {
    const plans = await ExercisePlan.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get published plans by trimester (mother-facing)
export const getExercisePlansByTrimester = async (req, res) => {
  try {
    const { trimester } = req.params;

    const plans = await ExercisePlan.find({
      trimester: Number(trimester),
      isPublished: true,
    });

    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single plan
export const getExercisePlanById = async (req, res) => {
  try {
    const plan = await ExercisePlan.findById(req.params.id);

    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise plan not found" });
    }

    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update plan (admin only)
export const updateExercisePlan = async (req, res) => {
  try {
    const plan = await ExercisePlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise plan not found" });
    }

    res.status(200).json({
      success: true,
      message: "Exercise plan updated successfully",
      data: plan,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete plan (admin only)
export const deleteExercisePlan = async (req, res) => {
  try {
    const plan = await ExercisePlan.findByIdAndDelete(req.params.id);

    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise plan not found" });
    }

    res.status(200).json({
      success: true,
      message: "Exercise plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
