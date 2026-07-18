const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middlewares/auth.middleware');
const { register, login, getMe } = require('./auth.controller');
const validationMiddleware = require('../../middlewares/validation.middleware');
const { registerSchema, loginSchema } = require('./auth.validation');
const upload = require('../../utils/upload');

router.post('/register', upload.single('credential'), validationMiddleware(registerSchema), register);

router.post('/login', validationMiddleware(loginSchema), login);

router.get('/me', authMiddleware, getMe);

module.exports = router;
