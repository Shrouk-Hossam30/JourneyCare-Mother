const Doctor = require('./doctor.model');
const User = require('../auth/user.model');



//-----------------------doctor apis data after registeration-----------------------
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
        const doctorId = req.params.id

        const doctor = await Doctor.findByIdAndUpdate(
            doctorId,
            {
                $push: {
                    slots: { $each: slots }
                }
            },
            { new: true, runValidators: true }
        );

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        await doctor.save();
        res.status(200).json({ message: "slots added" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getSlots = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        res.status(200).json({ slots: doctor.slots });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSlots = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        doctor.slots = [];
        await doctor.save();
        res.status(200).json({ message: "slots deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const cancelSlot = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const { slotId } = req.body;

        doctor.slots.pull(slotId);

        await doctor.save();

        res.status(200).json({ message: "Slot deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//----------------------doctor apis related to appointments----------------------
const getAppointments = async (req, res) => {
    // To be implemented
};  // to test it you need appointment data

const getAppointmentById = async (req, res) => {
    // To be implemented
};  // to test it you need appointment data

const updateAppointmentStatus = async (req, res) => {
    // To be implemented
};  // to test it you need appointment data

const getMotherProfile = async (req, res) => {
    // To be implemented
};// to test it you need appointment data


const deleteAppointment = async (req, res) => {
    // To be implemented
};// to test it you need appointment data



//----------------------doctor apis related to reviews----------------------
const getReviews = async (req, res) => {
    // To be implemented
};// to test it you need appointment data



//----------------------After visit--------------------------------
const postVisitReport = async (req, res) => {
    //to be implemented
}

module.exports = {
    formSubmission,
    editinfo,
    getAllDoctors,
    getDoctorById,
    setSlots,
    getSlots,
    cancelSlot,
    deleteSlots,
    getAppointments,
    getMotherProfile,
    deleteAppointment
};

