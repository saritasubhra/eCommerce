const cloudinary = require("../lib/cloudinary");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");

const getAllProducts = async (req, res, next) => {
  try {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    let filterObj = { ...req.query };
    const excludeFields = ["sort", "limit", "page", "fields"];
    excludeFields.forEach((el) => delete filterObj[el]);
    let filterStr = JSON.stringify(filterObj);
    filterStr = filterStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    filterObj = JSON.parse(filterStr);
    const query = Product.find(filterObj);

    const products = await query;

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
    const { prodname, description, price, image, category } = req.body;

    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const newProduct = await Product.create({
      prodname,
      description,
      price,
      image: cloudinaryResponse.secure_url ? cloudinaryResponse.secure_url : "",
      category,
    });

    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: newProduct,
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
    const product = await Product.findById(req.params.productID);

    if (!product) {
      return next(new AppError("No product found with that ID", 404));
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    await Product.findByIdAndDelete(req.params.productID);

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
