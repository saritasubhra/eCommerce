const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
// const { protect } = require("../controllers/authController");

const router = express.Router();

// router.use(protect);

router.route("/").get(getAllProducts).post(createProduct);
router
  .route("/:productID")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
