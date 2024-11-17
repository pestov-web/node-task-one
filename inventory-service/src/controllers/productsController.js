const ProductModel = require("../models/productModel");

exports.createProduct = async (req, res) => {
  const { plu, name } = req.body;
  try {
    const product = await ProductModel.create(plu, name);
    res.status(201).json(product[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

exports.getProducts = async (req, res) => {
  const { name, plu } = req.query;
  try {
    const products = await ProductModel.findByFilters(name, plu);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
