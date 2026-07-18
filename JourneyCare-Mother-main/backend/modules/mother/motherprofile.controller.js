import MotherProfile from "../models/MotherProfile.js";

// Create Mother Profile
export const createMotherProfile = async (req, res) => {
  try {
    const profile = await MotherProfile.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Mother profile created successfully",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Mothers (admin/doctor)
export const getAllMotherProfiles = async (req, res) => {
  try {
    const profiles = await MotherProfile.find()
      .populate("user", "-password")
      .populate("activePregnancy")
      .populate("children");

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Mother Profile By ID
export const getMotherProfileById = async (req, res) => {
  try {
    const profile = await MotherProfile.findById(req.params.id)
      .populate("user", "-password")
      .populate("activePregnancy")
      .populate("children");

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Mother profile not found" });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get logged-in mother's own profile
export const getMyMotherProfile = async (req, res) => {
  try {
    const profile = await MotherProfile.findOne({ user: req.user.id })
      .populate("activePregnancy")
      .populate("children");

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Mother profile not found" });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Mother Profile
export const updateMotherProfile = async (req, res) => {
  try {
    const profile = await MotherProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Mother profile not found" });
    }

    res.status(200).json({
      success: true,
      message: "Mother profile updated successfully",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Mother Profile
export const deleteMotherProfile = async (req, res) => {
  try {
    const profile = await MotherProfile.findByIdAndDelete(req.params.id);

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Mother profile not found" });
    }

    res.status(200).json({
      success: true,
      message: "Mother profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
