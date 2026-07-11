const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middlewares/auth.middleware');

const { register, login, getMe } = require('./auth.controller');

const validationMiddleware = require('../../middlewares/validation.middleware');
const { registerSchema, loginSchema } = require('./auth.validation');

router.post('/register', validationMiddleware(registerSchema), register);

router.post('/login', validationMiddleware(loginSchema), login);

router.get('/me', authMiddleware, getMe);

module.exports = router;
