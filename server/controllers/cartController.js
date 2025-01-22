const User = require("../models/userModel");

const addToCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const { user } = req;
    const existingItem = user.cartItems.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ productId });
    }

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Product added to cart",
      data: user.cartItems,
    });
  } catch (error) {
    next(error);
  }
};

const getCartItems = async (req, res, next) => {
  try {
    const userdata = await User.findById(req.user._id).populate({
      path: "cartItems.productId",
      select: "prodname image price",
    });

    res.status(200).json({
      status: "success",
      results: userdata.cartItems.length,
      data: userdata.cartItems,
    });
  } catch (error) {
    next(error);
  }
};

const updateQuantity = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const { cartItems } = req.user;
    const { user } = req;

    const product = cartItems.find(
      (item) => productId === item.productId.toString()
    );

    if (product.quantity === 1 && quantity === -1) {
      user.cartItems = user.cartItems.filter(
        (item) => productId !== item.productId.toString()
      );
    } else {
      product.quantity += quantity;
    }

    await user.save({ validateBeforeSave: false });

    const userdata = await User.findById(req.user._id).populate({
      path: "cartItems.productId",
      select: "prodname image price",
    });

    res.status(200).json({
      status: "success",
      message: "Quantity updated successfully",
      data: userdata.cartItems,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCartItem = async (req, res, next) => {
  try {
    const { productId } = req.body;

    // const res = await axios.delete("/cart", { data: { productId } });
    //Otherwise productId will be undefined
    const { user } = req;

    console.log(productId);

    user.cartItems = user.cartItems.filter(
      (item) => productId !== item.productId.toString()
    );
    console.log(user.cartItems);

    await user.save({ validateBeforeSave: false });

    const userdata = await User.findById(req.user._id).populate({
      path: "cartItems.productId",
      select: "prodname image price",
    });

    res.status(200).json({
      status: "success",
      message: "Item deleted successfully",
      data: userdata.cartItems,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addToCart, getCartItems, updateQuantity, deleteCartItem };
