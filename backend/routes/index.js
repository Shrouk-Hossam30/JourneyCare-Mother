const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');

const chatRoutes = require('../modules/chat/chat.routes');

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/chat', chatRoutes);

module.exports = router;