const express = require("express");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
// const { protect } = require("../controllers/authController");

const router = express.Router();

// router.use(protect);

router.route("/").get(getAllUsers).post(createUser);
router.route("/:userID").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
