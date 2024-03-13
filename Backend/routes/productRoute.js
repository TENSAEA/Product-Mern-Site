const express = require("express");
const router = express.Router();
const { productValidator } = require("../middleware/productValidator");
const { protectProduct } = require("../middleware/authMiddleware");
const { adminValidator } = require("../middleware/adminValidator");
const {
  getAllProducts,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

router
  .route("/")
  .get(protectProduct, adminValidator, getAllProducts)
  .post(protectProduct, productValidator, createProduct);

router
  .route("/:id")
  .get(protectProduct, getProducts)
  .put(protectProduct, productValidator, updateProduct)
  .delete(protectProduct, deleteProduct);

module.exports = router;
