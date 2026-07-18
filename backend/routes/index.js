const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const adminRouter = require('../modules/admin/admin.routes');
const chatRoutes = require('../modules/chat/chat.routes');
const blogRoutes = require('../modules/blog/blog.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRouter);
router.use('/blogs', blogRoutes);

router.use('/chat', chatRoutes);

module.exports = router;
