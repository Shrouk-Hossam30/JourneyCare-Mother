const express = require("express");
const router = express.Router();

const {
    formSubmission,
    editinfo,
    getAllDoctors,
    getDoctorById,
    setSlots,
    getAppointments,
    getMotherProfile,
} = require("./doctor.controller");


const authMiddleware = require("../../middlewares/auth.middleware");
const { acceptdoctorMiddleware } = require("../../middlewares/acceptdoctor.middleware");
const { acceptacemiddleware } = require("../../middlewares/acceptappointment.middleware");


router.patch('/me/putinfo/:id', formSubmission);
router.patch('/me/editinfo/:id', editinfo);                             //tested
router.get('/all', getAllDoctors);                              //tested
router.get('/id', getDoctorById);                               //tested
router.patch('/slots', setSlots);
router.get('/appointments', getAppointments);
router.get('/mother-profile', authMiddleware, acceptdoctorMiddleware, acceptacemiddleware, getMotherProfile);

module.exports = router;



