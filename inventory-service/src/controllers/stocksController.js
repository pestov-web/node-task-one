const StockModel = require("../models/stockModel");

exports.createStock = async (req, res, next) => {
  const { productId, shopId, shelfQuantity, orderQuantity } = req.body;

  try {
    const stock = await StockModel.create(
      productId,
      shopId,
      shelfQuantity,
      orderQuantity
    );

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
  const { productId, shopId, quantity } = req.body;

  try {
    const result =
      operation === "increase"
        ? await StockModel.increase(productId, shopId, quantity)
        : await StockModel.decrease(productId, shopId, quantity);

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

exports.getStocks = async (req, res) => {
  const { plu, shopId, minShelf, maxShelf, minOrder, maxOrder } = req.query;
  try {
    const stocks = await StockModel.findByFilters(
      plu,
      shopId,
      minShelf,
      maxShelf,
      minOrder,
      maxOrder
    );
    res.json(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stocks" });
  }
};
