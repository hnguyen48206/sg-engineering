const Joi = require("joi");

const createSchema = Joi.object({
  username: Joi.string().min(2).max(20).required(),
  password: Joi.string().min(10).max(20).required(),
});

const updateSchema = Joi.object({
  id: Joi.number().required(),
  password: Joi.string().min(10).max(20).required(),
});

const removeSchema = Joi.object({
  id: Joi.number().required(),
});

const loginSchema = Joi.object({
  username: Joi.string().min(2).max(20).required(),
  password: Joi.string().min(10).max(20).required(),
});

module.exports = {
  createSchema,
  updateSchema,
  removeSchema,
  loginSchema,
};
