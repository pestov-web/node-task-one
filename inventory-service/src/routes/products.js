const router = require("express").Router();
const {
  createProduct,
  getProducts,
} = require("../controllers/productsController");
const {
  createProductValidation,
  getProductValidation,
} = require("../middlewares/productValidation");

router.post("/", createProductValidation, createProduct);
router.get("/", getProductValidation, getProducts);

module.exports = router;
