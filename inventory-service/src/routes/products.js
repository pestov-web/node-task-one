const router = require("express").Router();
const {
  createProduct,
  getProducts,
} = require("../controllers/productsController");

router.post("/", createProduct);
router.get("/", getProducts);

module.exports = router;
