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
const { checkRolePermission } = require("../../middleware/role_middleware");
ProductRoutes.post(
  "/post",
  verifyAccessToken,
  checkRolePermission("Create"),
  validateProduct,
  asyncHandler(postProductController)
);
ProductRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getProductController)
);
ProductRoutes.put(
  "/put",
  verifyAccessToken,
  checkRolePermission("Update"),
  asyncHandler(putProductController)
);
ProductRoutes.delete(
  "/delete",
  verifyAccessToken,
  asyncHandler(deleteProductController)
);

module.exports = ProductRoutes;
