const express = require("express");
const ProductRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
const {
  postProductController,
  getProductController,
  putProductController,
  deleteProductController,
} = require("../controllers/product_controller");
const {
  validateProduct,
} = require("../../middleware/validate/validateProduct");

const { verifyAccessToken } = require("../services/jwt_service");
ProductRoutes.post(
  "/post",
  verifyAccessToken,
  validateProduct,
  asyncHandler(postProductController)
);
ProductRoutes.get(
  "/get",
  verifyAccessToken,
  asyncHandler(getProductController)
);
ProductRoutes.put(
  "/put",
  verifyAccessToken,
  asyncHandler(putProductController)
);
ProductRoutes.delete(
  "/delete",
  verifyAccessToken,
  asyncHandler(deleteProductController)
);

module.exports = ProductRoutes;
