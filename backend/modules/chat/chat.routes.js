const express = require('express');
const router = express.Router();


const chatController = require('./chat.controller');

router.get('/token', chatController.generateStreamToken);

module.exports = router;