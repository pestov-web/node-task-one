const router = require("express").Router();
const productsController = require("../controllers/productsController");

router.post("/", productsController.createProduct);
router.get("/", productsController.getProducts);

module.exports = router;
