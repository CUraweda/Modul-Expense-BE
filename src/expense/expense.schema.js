const Joi = require("joi");

const addExpenseSchema = Joi.object({
  name: Joi.string().required(),
  date: Joi.string().required(),
  kategoriId: Joi.number().required(),
  biaya: Joi.number().required(),
  status: Joi.string().required(),
  userId: Joi.number().required(),
}).unknown(true);

module.exports = { addExpenseSchema }