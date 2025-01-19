const express = require("express");
const { addToCart } = require("../controllers/cartController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.post("/", protect, addToCart);

module.exports = router;
