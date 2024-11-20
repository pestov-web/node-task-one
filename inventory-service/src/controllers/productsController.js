const ProductModel = require("../models/productModel");
const { sendMessage } = require("../rabbitmqClient");

exports.createProduct = async (req, res, next) => {
  const { plu, name } = req.body;
  try {
    const product = await ProductModel.create(plu, name);
    if (product.length) {
      await sendMessage({
        plu: product[0].plu,
        action: "Product created",
      });
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
  const { name, plu, page = 1, limit = 10 } = req.query;
  try {
    const { data, total } = await ProductModel.findByFilters({
      name,
      plu,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
    res.status(200).json({
      status: "success",
      total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      data,
    });
  } catch (error) {
    next(error);
  }
};
