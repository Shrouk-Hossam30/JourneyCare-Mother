const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    media: {
      url: {
        type: String,
        default: '',
      },

      type: {
        type: String,
        enum: ['image', 'video'],
        default: 'image',
      },
    },

    category: {
      type: String,
      enum: ['Pregnancy', 'Nutrition', 'Baby Care', 'Vaccination', 'Health', 'Tips'],
      default: 'Health',
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Blog', blogSchema);
