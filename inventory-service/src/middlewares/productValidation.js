const { celebrate, Joi, Segments } = require("celebrate");

exports.createProductValidation = celebrate({
  [Segments.BODY]: Joi.object({
    plu: Joi.string().required(),
    name: Joi.string().required(),
  }),
});

exports.getProductValidation = celebrate({
  [Segments.QUERY]: Joi.object({
    name: Joi.string(),
    plu: Joi.string(),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1),
  }),
});
