const { celebrate, Joi, Segments } = require("celebrate");

exports.stockValidation = celebrate({
  [Segments.BODY]: Joi.object({
    plu: Joi.string(),
    shopId: Joi.number().integer().positive().required(),
    shelfQuantity: Joi.number().integer().min(0).required(),
    orderQuantity: Joi.number().integer().min(0).required(),
  }),
});

exports.getStocksValidation = celebrate({
  [Segments.QUERY]: Joi.object({
    plu: Joi.string(),
    shopId: Joi.number().integer().min(0),
    minShelf: Joi.number().integer().min(0),
    maxShelf: Joi.number().integer().min(0),
    minOrder: Joi.number().integer().min(0),
    maxOrder: Joi.number().integer().min(0),
  }),
});
