const { celebrate, Joi, Segments } = require("celebrate");

exports.createStockValidation = celebrate({
  [Segments.BODY]: Joi.object({
    productId: Joi.number().integer().positive().required(),
    shopId: Joi.number().integer().positive().required(),
    shelfQuantity: Joi.number().integer().min(0).required(),
    orderQuantity: Joi.number().integer().min(0).required(),
  }),
});

exports.toggleStockValidation = celebrate({
  [Segments.BODY]: Joi.object({
    productId: Joi.number().integer().positive().required(),
    shopId: Joi.number().integer().positive().required(),
    quantity: Joi.number().integer().min(0).required(),
  }),
});
