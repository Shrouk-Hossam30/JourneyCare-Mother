const express = require('express');

const router = express.Router();

const uploadMedia = require('../../middlewares/uploadMedia.middleware');

const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');

const {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByCategory,
  deleteBlog,
  updateBlog,
} = require('./blog.controller');

router.post('/', authMiddleware, roleMiddleware('admin'), uploadMedia.single('media'), createBlog);

router.get('/', getAllBlogs);

router.get('/category/:category', getBlogsByCategory);
router.get('/:id', getBlogById);

router.patch(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  uploadMedia.single('media'),
  updateBlog,
);

router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteBlog);

module.exports = router;
