const Blog = require('./blog.model');

const createBlog = async (req, res) => {
  try {
    const { title, content, category, isPublished } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image or video',
      });
    }

    const media = {
      url: req.file.path,
      type: req.file.mimetype.startsWith('image') ? 'image' : 'video',
    };

    const blog = await Blog.create({
      title,
      content,
      category,
      isPublished,
      media,
      author: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBlog,
};
