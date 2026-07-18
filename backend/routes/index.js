const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const adminRouter = require('../modules/admin/admin.routes');
const chatRoutes = require('../modules/chat/chat.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRouter);

router.use('/chat', chatRoutes);

module.exports = router;
