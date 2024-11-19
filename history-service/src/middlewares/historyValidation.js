const { celebrate, Joi, Segments } = require("celebrate");

exports.historyValidation = celebrate({
  [Segments.QUERY]: Joi.object({
    shopId: Joi.number().integer().positive(),
    plu: Joi.string(),
    action: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1),
  }),
});
