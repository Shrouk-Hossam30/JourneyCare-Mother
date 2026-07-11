const Joi = require('joi');

const registerSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(100).required(),

  email: Joi.string().trim().email().required(),

  password: Joi.string().min(6).required(),

  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
  }),

  phone: Joi.string().trim().required(),

  role: Joi.string().valid('mother', 'doctor').required(),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),

  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
