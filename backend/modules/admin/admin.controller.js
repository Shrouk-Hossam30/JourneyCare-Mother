const User = require('../auth/user.model');

const dashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalDoctors = await User.countDocuments({
      role: 'doctor',
    });

    const pendingDoctors = await User.countDocuments({
      role: 'doctor',
      status: 'pending',
    });

    const totalMothers = await User.countDocuments({
      role: 'mother',
    });

    const blockedUsers = await User.countDocuments({
      status: 'blocked',
    });

    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalDoctors,
        pendingDoctors,
        totalMothers,
        blockedUsers,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const pendingDoctors = async (req, res) => {
  try {
    const doctors = await User.find({
      role: 'doctor',
      status: 'pending',
    }).select('-password');

    return res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const approveDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await User.findOne({
      _id: id,
      role: 'doctor',
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    doctor.status = 'active';

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: 'Doctor approved successfully',
      data: doctor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  dashboard,
  pendingDoctors,
  approveDoctor,
};
