const router = require("express").Router();
const {
  increaseStock,
  decreaseStock,
  getStocks,
  createStock,
} = require("../controllers/stocksController");
const {
  createStockValidation,
  changeStockValidation,
  getStocksValidation,
} = require("../middlewares/validate");

router.post("/", createStockValidation, createStock);
router.patch("/increase", changeStockValidation, increaseStock);
router.patch("/decrease", changeStockValidation, decreaseStock);
router.get("/", getStocksValidation, getStocks);

module.exports = router;
