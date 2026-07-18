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
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name email').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getBlogsByCategory = async (req, res) => {
  try {
    const blogs = await Blog.find({
      category: req.params.category,
      isPublished: true,
    })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    if (req.file) {
      blog.media = {
        url: req.file.path,
        type: req.file.mimetype.startsWith('image') ? 'image' : 'video',
      };
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.category = req.body.category || blog.category;

    if (req.body.isPublished !== undefined) {
      blog.isPublished = req.body.isPublished;
    }

    await blog.save();

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByCategory,
  updateBlog,
  deleteBlog,
};
