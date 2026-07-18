import SleepTracking from "../models/SleepTracking.js";

// Create a sleep entry
export const createSleepEntry = async (req, res) => {
  try {
    const entry = await SleepTracking.create({
      ...req.body,
      child: req.params.childId,
    });

    res.status(201).json({
      success: true,
      message: "Sleep entry added successfully",
      data: entry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all sleep entries for a child
export const getSleepEntriesByChild = async (req, res) => {
  try {
    const entries = await SleepTracking.find({
      child: req.params.childId,
    }).sort({ sleepStart: -1 });

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get sleep stats for a child (avg duration, count by type) over the last N days
export const getSleepStats = async (req, res) => {
  try {
    const days = Number(req.query.days) || 7;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const entries = await SleepTracking.find({
      child: req.params.childId,
      sleepStart: { $gte: since },
    });

    const totalMinutes = entries.reduce(
      (sum, e) => sum + (e.durationMinutes || 0),
      0
    );

    res.status(200).json({
      success: true,
      data: {
        periodDays: days,
        totalEntries: entries.length,
        totalSleepMinutes: totalMinutes,
        averageSleepMinutesPerEntry:
          entries.length > 0 ? Math.round(totalMinutes / entries.length) : 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update sleep entry
export const updateSleepEntry = async (req, res) => {
  try {
    const entry = await SleepTracking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!entry) {
      return res
        .status(404)
        .json({ success: false, message: "Sleep entry not found" });
    }

    res.status(200).json({
      success: true,
      message: "Sleep entry updated successfully",
      data: entry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete sleep entry
export const deleteSleepEntry = async (req, res) => {
  try {
    const entry = await SleepTracking.findByIdAndDelete(req.params.id);

    if (!entry) {
      return res
        .status(404)
        .json({ success: false, message: "Sleep entry not found" });
    }

    res.status(200).json({
      success: true,
      message: "Sleep entry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
