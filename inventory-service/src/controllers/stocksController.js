const StockModel = require("../models/stockModel");
const { sendMessage } = require("../rabbitmqClient");

exports.createStock = async (req, res, next) => {
  const { plu, shopId, shelfQuantity, orderQuantity } = req.body;

  try {
    const stock = await StockModel.create(
      plu,
      shopId,
      shelfQuantity,
      orderQuantity
    );
    await sendMessage({
      plu,
      shopId,
      action: "Stock created",
      shelfQuantity,
      orderQuantity,
    });
    if (stock.length) {
      return res.status(201).json({
        status: "success",
        message: "Stock created successfully",
        data: stock[0],
      });
    }

    res.status(400).json({
      status: "error",
      message: "Failed to create stock",
    });
  } catch (error) {
    next(error);
  }
};

const changeStock = async (req, res, next, operation) => {
  const { plu, shopId, shelfQuantity, orderQuantity } = req.body;

  try {
    const result =
      operation === "increase"
        ? await StockModel.increase(plu, shopId, shelfQuantity, orderQuantity)
        : await StockModel.decrease(plu, shopId, shelfQuantity, orderQuantity);
    await sendMessage({
      plu,
      shopId,
      action: `Stock ${operation}d`,
      shelfQuantity,
      orderQuantity,
    });
    if (result.length) {
      return res.status(200).json({
        status: "success",
        message: `Stock ${operation}d successfully`,
        data: result[0],
      });
    }

    return res.status(404).json({
      status: "error",
      message: "Stock not found for this product and shop",
    });
  } catch (error) {
    next(error);
  }
};
exports.increaseStock = (req, res, next) =>
  changeStock(req, res, next, "increase");

exports.decreaseStock = (req, res, next) =>
  changeStock(req, res, next, "decrease");

exports.getStocks = async (req, res, next) => {
  const {
    plu,
    shopId,
    minShelf,
    maxShelf,
    minOrder,
    maxOrder,
    page = 1,
    limit = 10,
  } = req.query;
  try {
    const { data, total } = await StockModel.findByFilters({
      plu,
      shopId,
      minShelf,
      maxShelf,
      minOrder,
      maxOrder,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
    res.status(200).json({
      status: "success",
      total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      data,
    });
  } catch (error) {
    next(error);
  }
};
