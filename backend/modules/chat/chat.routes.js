const express = require('express');
const router = express.Router();
const chatController = require('./chat.controller');

// استدعاء الـ Auth Middleware من مكانه المظبوط
const authMiddleware = require('../../middlewares/auth.middleware');

// حماية كل الـ Routes اللي جاية؛ لازم اليوزر يكون مسجل دخول
router.use(authMiddleware);

// مسار إنشاء غرفة محادثة جديدة بين الأم والدكتور (POST)
router.post('/channel', chatController.createChatChannel);

// مسار جلب جميع المحادثات الخاصة بالمستخدم الحالي (GET)
router.get('/channels', chatController.getUserChannels);

// مسار إرسال رسالة جديدة داخل المحادثة (POST) 🚀
router.post('/messages', chatController.sendMessage);

module.exports = router;