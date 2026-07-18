const express = require('express');

const router = express.Router();

const uploadMedia = require('../../middlewares/uploadMedia.middleware');

const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');

const { createBlog } = require('./blog.controller');

router.post('/', authMiddleware, roleMiddleware('admin'), uploadMedia.single('media'), createBlog);

module.exports = router;
