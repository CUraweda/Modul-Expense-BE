const Joi = require("joi");

const addKategoriSchema = Joi.object({
  name: Joi.string().required(),
  
}).unknown(true);

module.exports = { addKategoriSchema }