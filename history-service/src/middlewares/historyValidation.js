const { celebrate, Joi, Segments } = require("celebrate");

exports.createHistoryValidation = celebrate({
  [Segments.BODY]: Joi.object({
    shopId: Joi.number().integer().positive().required(),
    plu: Joi.string().required(),
    date: Joi.date().required(),
    action: Joi.string().required(),
  }),
});
