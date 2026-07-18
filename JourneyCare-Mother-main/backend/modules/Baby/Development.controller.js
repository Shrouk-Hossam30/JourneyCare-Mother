import DevelopmentTracking from "../models/DevelopmentTracking.js";
import Child from "../models/Child.js";

// Create a milestone entry
export const createDevelopmentEntry = async (req, res) => {
  try {
    const child = await Child.findById(req.params.childId);

    if (!child) {
      return res
        .status(404)
        .json({ success: false, message: "Child not found" });
    }

    const achievedDate = req.body.achievedDate
      ? new Date(req.body.achievedDate)
      : new Date();

    const ageAtAchievementMonths = Math.floor(
      (achievedDate.getTime() - child.dateOfBirth.getTime()) /
        (1000 * 60 * 60 * 24 * 30.44)
    );

    const entry = await DevelopmentTracking.create({
      ...req.body,
      achievedDate,
      ageAtAchievementMonths,
      child: child._id,
      addedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Development milestone added successfully",
      data: entry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all milestones for a child, optional category filter
export const getDevelopmentByChild = async (req, res) => {
  try {
    const filter = { child: req.params.childId };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const entries = await DevelopmentTracking.find(filter).sort({
      achievedDate: -1,
    });

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update milestone entry
export const updateDevelopmentEntry = async (req, res) => {
  try {
    const entry = await DevelopmentTracking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!entry) {
      return res
        .status(404)
        .json({ success: false, message: "Development entry not found" });
    }

    res.status(200).json({
      success: true,
      message: "Development entry updated successfully",
      data: entry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete milestone entry
export const deleteDevelopmentEntry = async (req, res) => {
  try {
    const entry = await DevelopmentTracking.findByIdAndDelete(req.params.id);

    if (!entry) {
      return res
        .status(404)
        .json({ success: false, message: "Development entry not found" });
    }

    res.status(200).json({
      success: true,
      message: "Development entry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
