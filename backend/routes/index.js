const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const doctorRoutes = require('../modules/doctor/doctor.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/doctor', doctorRoutes);

module.exports = router;
