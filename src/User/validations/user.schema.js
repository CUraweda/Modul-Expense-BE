const Joi = require("joi");

const addUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.number().required(),
  kategoriUserId: Joi.number(),
  password: Joi.string().min(3).max(30).required(),
}).unknown(true);

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  role: Joi.number(),
  kategoriUserId: Joi.number()
 
}).unknown(true);

module.exports = { addUserSchema, updateUserSchema };
