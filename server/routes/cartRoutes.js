const express = require("express");
const { addToCart, getCartItems } = require("../controllers/cartController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.use(protect);
router.route("/").get(getCartItems).post(addToCart);

module.exports = router;
