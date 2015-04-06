var Joi = require('joi')

const LinkSchema = Joi.object().keys({

  _id: Joi.string().alphanum().required(),

  _rev: Joi.any(),

  url: Joi.string().uri().required(),

  created: Joi.number().integer().required(),

  accessed: Joi.number().integer(),

  access_count: Joi.number().integer()

})