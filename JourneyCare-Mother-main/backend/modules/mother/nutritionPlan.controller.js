import NutritionPlan from "../models/NutritionPlan.js";

// Create (admin only)
export const createNutritionPlan = async (req, res) => {
  try {
    const plan = await NutritionPlan.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Nutrition plan created successfully",
      data: plan,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all plans (admin view - includes unpublished)
export const getAllNutritionPlans = async (req, res) => {
  try {
    const plans = await NutritionPlan.find().sort({ createdAt: -1 });

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
export const getNutritionPlansByTrimester = async (req, res) => {
  try {
    const { trimester } = req.params;

    const plans = await NutritionPlan.find({
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
export const getNutritionPlanById = async (req, res) => {
  try {
    const plan = await NutritionPlan.findById(req.params.id);

    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Nutrition plan not found" });
    }

    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update plan (admin only)
export const updateNutritionPlan = async (req, res) => {
  try {
    const plan = await NutritionPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Nutrition plan not found" });
    }

    res.status(200).json({
      success: true,
      message: "Nutrition plan updated successfully",
      data: plan,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete plan (admin only)
export const deleteNutritionPlan = async (req, res) => {
  try {
    const plan = await NutritionPlan.findByIdAndDelete(req.params.id);

    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Nutrition plan not found" });
    }

    res.status(200).json({
      success: true,
      message: "Nutrition plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
