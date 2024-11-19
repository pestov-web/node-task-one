const router = require("express").Router();
const {
  increaseStock,
  decreaseStock,
  getStocks,
  createStock,
} = require("../controllers/stocksController");
const {
  stockValidation,
  getStocksValidation,
} = require("../middlewares/stockValidation");

router.post("/", stockValidation, createStock);
router.patch("/increase", stockValidation, increaseStock);
router.patch("/decrease", stockValidation, decreaseStock);
router.get("/", getStocksValidation, getStocks);

module.exports = router;
