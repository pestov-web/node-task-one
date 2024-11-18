const ProductModel = require("../models/productModel");

exports.createProduct = async (req, res) => {
  const { plu, name } = req.body;
  try {
    const product = await ProductModel.create(plu, name);
    if (product.length) {
      return res.status(201).json({
        status: "success",
        message: "Product created successfully",
        data: product[0],
      });
    }

    res.status(400).json({
      status: "error",
      message: "Failed to create product",
    });
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res) => {
  const { name, plu } = req.query;
  try {
    const products = await ProductModel.findByFilters(name, plu);
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
