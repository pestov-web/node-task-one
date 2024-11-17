const router = require("express").Router();
const stocksController = require("../controllers/stocksController");

router.post("/", stocksController.createStock);
router.patch("/increase/:stockId", stocksController.increaseStock);
router.patch("/decrease/:stockId", stocksController.decreaseStock);
router.get("/", stocksController.getStocks);

module.exports = router;
