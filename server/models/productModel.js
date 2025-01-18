const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    prodname: {
      type: String,
      required: [true, "This field is requied."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "This field is requied."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "This field is requied."],
    },
    image: {
      type: String,
      required: [true, "This field is requied."],
    },
    category: {
      type: String,
      required: [true, "This field is requied."],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
