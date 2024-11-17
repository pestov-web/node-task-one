const StockModel = require("../models/stockModel");

exports.createStock = async (req, res) => {
  const { productId, shopId, shelfQuantity, orderQuantity } = req.body;
  try {
    const stock = await StockModel.create(
      productId,
      shopId,
      shelfQuantity,
      orderQuantity
    );
    res.status(201).json(stock[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create stock" });
  }
};

exports.increaseStock = async (req, res) => {
  const { stockId } = req.params;
  const { quantity } = req.body;
  try {
    const stock = await StockModel.increase(stockId, quantity);
    res.json(stock[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to increase stock quantity" });
  }
};

exports.decreaseStock = async (req, res) => {
  const { stockId } = req.params;
  const { quantity } = req.body;
  try {
    const stock = await StockModel.decrease(stockId, quantity);
    if (!stock.length) {
      return res.status(400).json({ error: "Not enough stock to decrease" });
    }
    res.json(stock[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to decrease stock quantity" });
  }
};

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
