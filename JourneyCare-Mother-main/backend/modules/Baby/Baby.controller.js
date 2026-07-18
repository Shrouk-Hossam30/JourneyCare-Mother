import Child from "../models/Child.js";
import MotherProfile from "../../pregnancy/models/MotherProfile.js";

// Create Child (mother creates a profile for her child)
export const createChild = async (req, res) => {
  try {
    const motherProfile = await MotherProfile.findOne({ user: req.user.id });

    if (!motherProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Mother profile not found" });
    }

    const child = await Child.create({
      ...req.body,
      motherProfile: motherProfile._id,
    });

    res.status(201).json({
      success: true,
      message: "Child profile created successfully",
      data: child,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all children (admin/doctor)
export const getAllChildren = async (req, res) => {
  try {
    const children = await Child.find().populate(
      "motherProfile",
      "fullName phone email"
    );

    res.status(200).json({
      success: true,
      count: children.length,
      data: children,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get children of the logged-in mother
export const getMyChildren = async (req, res) => {
  try {
    const motherProfile = await MotherProfile.findOne({ user: req.user.id });

    if (!motherProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Mother profile not found" });
    }

    const children = await Child.find({ motherProfile: motherProfile._id });

    res.status(200).json({
      success: true,
      count: children.length,
      data: children,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single child by ID
export const getChildById = async (req, res) => {
  try {
    const child = await Child.findById(req.params.id).populate(
      "motherProfile",
      "fullName phone email"
    );

    if (!child) {
      return res
        .status(404)
        .json({ success: false, message: "Child not found" });
    }

    res.status(200).json({ success: true, data: child });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update child
export const updateChild = async (req, res) => {
  try {
    const child = await Child.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!child) {
      return res
        .status(404)
        .json({ success: false, message: "Child not found" });
    }

    res.status(200).json({
      success: true,
      message: "Child profile updated successfully",
      data: child,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete child
export const deleteChild = async (req, res) => {
  try {
    const child = await Child.findByIdAndDelete(req.params.id);

    if (!child) {
      return res
        .status(404)
        .json({ success: false, message: "Child not found" });
    }

    res.status(200).json({
      success: true,
      message: "Child profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
