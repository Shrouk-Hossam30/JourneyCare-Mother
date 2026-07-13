const express = require("express");
const router = express.Router();

const {
    formSubmission,
    editinfo,
    getSlots,
    cancelSlot,
    deleteSlots,
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

// --------- should it be one API??????????????
router.patch('/edit-slots/:id', setSlots);                      //tested
router.delete('/cancel-slot/:id', cancelSlot);                      //tested
router.get('/slots/:id', getSlots);                                 //tested
router.delete('/delete-slots/:id', deleteSlots);                    //tested
//----------------------------------------------


//Appointment APIs
router.get('/appointments', getAppointments);



//----------Mother related APIs------------------
router.get('/mother-profile', authMiddleware, acceptdoctorMiddleware, acceptacemiddleware, getMotherProfile);

module.exports = router;



