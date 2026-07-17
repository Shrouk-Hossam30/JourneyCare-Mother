const express = require('express');
const router = express.Router();
const chatController = require('./chat.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.use(authMiddleware);

router.post('/channel', chatController.createChatChannel);

router.get('/channels', chatController.getUserChannels);

router.post('/messages', chatController.sendMessage);

module.exports = router;