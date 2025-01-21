const Joi = require("joi");

const createSchema = Joi.object({
  message: Joi.string().min(1).max(1000).required(),
});

module.exports = {
  createSchema,
};
