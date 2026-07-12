const Doctor = require('./doctor.model');
const User = require('../auth/user.model');


const formSubmission = async (req, res) => {
    try {
        const {
            nationalId,
            medicalLicense,
            specialty,
            experience,
            about,
            location,
            consultationFees
        } = req.body;

        const doctorId = req.params.id;

        // Check that the National ID isn't used by another doctor
        // عشان لو الدكتور مسجل قبل كدا
        const existDoctor = await Doctor.findOne({
            nationalId,
            _id: { $ne: doctorId }
        });

        if (existDoctor) {
            return res.status(400).json({
                message: "National ID already exists"
            });
        }

        const doctor = await Doctor.findByIdAndUpdate(
            doctorId,
            {
                nationalId,
                medicalLicense,
                specialty,
                experience,
                about,
                location,
                consultationFees
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile completed successfully",
            doctor
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const editinfo = async (req, res) => {
    try {
        const {
            nationalId,
            medicalLicense,
            specialty,
            experience,
            about,
            location,
            consultationFees
        } = req.body;

        const doctorId = req.params.id;
        const doctor = await Doctor.findByIdAndUpdate(
            doctorId,
            {
                nationalId,
                medicalLicense,
                specialty,
                experience,
                about,
                location,
                consultationFees
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile completed successfully",
            doctor
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET doctor/all & filter
const getAllDoctors = async (req, res) => {
    try {
        const filter = {};

        if (req.query.specialty) {
            filter.specialty = req.query.specialty;
        }

        if (req.query.location) {
            filter.location = req.query.location;
        }

        if (req.query.experience) {
            filter.experience = {
                $gte: Number(req.query.experience)
            };
        }

        const doctors = await Doctor.find(filter).select("-password");

        res.status(200).json(doctors);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /doctor/:id
const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        res.status(200).json({ data: { doctor } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// SET time slots for appointments for doctor
// PUT DOCTOR/SLOTS
const setSlots = async (req, res) => {
    try {
        const { slots } = req.body;
        const doctorId = req.user.id;
        const doctor = await Doctor.findByIdAndUpdate(
            doctorId,
            { slots },
            { new: true, runValidators: true }
        );
        await doctor.save();
        res.status(200).json({ message: "slots set" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAppointments = async (req, res) => {
    // To be implemented
};

const getMotherProfile = async (req, res) => {
    // To be implemented
};

const deleteAppointment = async (req, res) => {
    // To be implemented
};



module.exports = {
    formSubmission,
    editinfo,
    getAllDoctors,
    getDoctorById,
    setSlots,
    getAppointments,
    getMotherProfile,
    deleteAppointment
};

