import PregnancyTracking from "../models/PregnancyTracking.js";
import MotherProfile from "../models/MotherProfile.js";

// Create a new pregnancy tracking record + link it as the mother's activePregnancy
export const createPregnancyTracking = async (req, res) => {
  try {
    const motherProfile = await MotherProfile.findOne({ user: req.user.id });

    if (!motherProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Mother profile not found" });
    }

    const pregnancy = await PregnancyTracking.create({
      ...req.body,
      motherProfile: motherProfile._id,
    });

    motherProfile.activePregnancy = pregnancy._id;
    await motherProfile.save();

    res.status(201).json({
      success: true,
      message: "Pregnancy tracking created successfully",
      data: pregnancy,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all pregnancy records for a given mother
export const getPregnancyByMother = async (req, res) => {
  try {
    const records = await PregnancyTracking.find({
      motherProfile: req.params.motherId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single pregnancy record by ID
export const getPregnancyById = async (req, res) => {
  try {
    const pregnancy = await PregnancyTracking.findById(
      req.params.id
    ).populate("motherProfile", "fullName phone email");

    if (!pregnancy) {
      return res
        .status(404)
        .json({ success: false, message: "Pregnancy record not found" });
    }

    res.status(200).json({ success: true, data: pregnancy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update general pregnancy fields (status, dueDate, etc.)
export const updatePregnancyTracking = async (req, res) => {
  try {
    const pregnancy = await PregnancyTracking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!pregnancy) {
      return res
        .status(404)
        .json({ success: false, message: "Pregnancy record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Pregnancy tracking updated successfully",
      data: pregnancy,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete pregnancy record
export const deletePregnancyTracking = async (req, res) => {
  try {
    const pregnancy = await PregnancyTracking.findByIdAndDelete(
      req.params.id
    );

    if (!pregnancy) {
      return res
        .status(404)
        .json({ success: false, message: "Pregnancy record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Pregnancy tracking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a vitals entry (weight, blood pressure, blood sugar, fetal heart rate)
export const addVitalsEntry = async (req, res) => {
  try {
    const pregnancy = await PregnancyTracking.findById(req.params.id);

    if (!pregnancy) {
      return res
        .status(404)
        .json({ success: false, message: "Pregnancy record not found" });
    }

    pregnancy.vitals.push(req.body);
    await pregnancy.save();

    res.status(201).json({
      success: true,
      message: "Vitals entry added successfully",
      data: pregnancy.vitals[pregnancy.vitals.length - 1],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a symptom entry
export const addSymptomEntry = async (req, res) => {
  try {
    const pregnancy = await PregnancyTracking.findById(req.params.id);

    if (!pregnancy) {
      return res
        .status(404)
        .json({ success: false, message: "Pregnancy record not found" });
    }

    pregnancy.symptoms.push(req.body);
    await pregnancy.save();

    res.status(201).json({
      success: true,
      message: "Symptom entry added successfully",
      data: pregnancy.symptoms[pregnancy.symptoms.length - 1],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a mood log entry (psychological readiness)
export const addMoodLogEntry = async (req, res) => {
  try {
    const pregnancy = await PregnancyTracking.findById(req.params.id);

    if (!pregnancy) {
      return res
        .status(404)
        .json({ success: false, message: "Pregnancy record not found" });
    }

    pregnancy.psychologicalReadiness.moodLog.push(req.body);
    await pregnancy.save();

    res.status(201).json({
      success: true,
      message: "Mood log entry added successfully",
      data: pregnancy.psychologicalReadiness,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
