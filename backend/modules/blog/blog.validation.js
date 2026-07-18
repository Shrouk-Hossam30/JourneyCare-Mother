const Joi = require('joi');

const createBlogValidation = Joi.object({
  title: Joi.string().trim().min(5).max(150).required(),

  content: Joi.string().trim().min(20).required(),

  category: Joi.string()
    .valid('Pregnancy', 'Nutrition', 'Baby Care', 'Vaccination', 'Health', 'Tips')
    .required(),

  isPublished: Joi.boolean().optional(),
});

const updateBlogValidation = Joi.object({
  title: Joi.string().trim().min(5).max(150),

  content: Joi.string().trim().min(20),

  category: Joi.string().valid(
    'Pregnancy',
    'Nutrition',
    'Baby Care',
    'Vaccination',
    'Health',
    'Tips',
  ),

  isPublished: Joi.boolean(),
}).min(1);

module.exports = {
  createBlogValidation,
  updateBlogValidation,
};
