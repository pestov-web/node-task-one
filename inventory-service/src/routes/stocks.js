const router = require("express").Router();
const stocksController = require("../controllers/stocksController");

router.post("/", stocksController.createStock);
router.patch("/increase", stocksController.increaseStock);
router.patch("/decrease", stocksController.decreaseStock);
router.get("/", stocksController.getStocks);

module.exports = router;
