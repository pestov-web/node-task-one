const router = require("express").Router();
const {
  increaseStock,
  decreaseStock,
  getStocks,
  createStock,
} = require("../controllers/stocksController");
const {
  createStockValidation,
  toggleStockValidation,
} = require("../middlewares/validate");

router.post("/", createStockValidation, createStock);
router.patch("/increase", toggleStockValidation, increaseStock);
router.patch("/decrease", toggleStockValidation, decreaseStock);
router.get("/", getStocks);

module.exports = router;
