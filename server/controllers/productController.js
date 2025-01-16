const Product = require("../models/productModel");
const AppError = require("../utils/appError");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    if (!products) {
      return next(new AppError("No products found", 404));
    }

    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productID);

    if (!product) {
      return next(new AppError("No product found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { prodname, description, price, category } = req.body;

    const newProduct = await Product.create({
      prodname,
      description,
      price,
      category,
    });

    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      newProduct,
    });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productID,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return next(new AppError("No product found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productID);

    if (!product) {
      return next(new AppError("No product found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
