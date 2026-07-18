const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');
const { pendingDoctors, dashboard, approveDoctor } = require('./admin.controller');

// Dashboard
router.get('/dashboard', authMiddleware, roleMiddleware('admin'), dashboard);
router.get('/pending-doctors', authMiddleware, roleMiddleware('admin'), pendingDoctors);
router.patch('/doctors/:id/approve', authMiddleware, roleMiddleware('admin'), approveDoctor);

module.exports = router;
