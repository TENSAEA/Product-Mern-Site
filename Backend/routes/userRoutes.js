const express = require("express");
const { protect, protectProduct } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  register,
  login,
  getProfile,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protectProduct, getProfile);

module.exports = router;
