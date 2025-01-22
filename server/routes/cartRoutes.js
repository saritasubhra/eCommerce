const express = require("express");
const {
  addToCart,
  getCartItems,
  updateQuantity,
} = require("../controllers/cartController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.use(protect);
router.route("/").get(getCartItems).post(addToCart).patch(updateQuantity);

module.exports = router;
