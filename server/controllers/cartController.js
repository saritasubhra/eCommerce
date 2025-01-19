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
    const { cartItems } = req.user;

    res.status(200).json({
      status: "success",
      results: cartItems.length,
      data: cartItems,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addToCart, getCartItems };
