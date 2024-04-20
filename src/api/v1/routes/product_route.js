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
const { upload } = require("../../utils/imageUtils");

ProductRoutes.post(
  "/post",
  verifyAccessToken,
  upload.single("image"),
  checkRolePermission("Create"),

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
  upload.single("image"),
  checkRolePermission("Update"),
  asyncHandler(putProductController)
);
ProductRoutes.delete(
  "/delete/:id",
  verifyAccessToken,
  checkRolePermission("Delete"),
  asyncHandler(deleteProductController)
);

module.exports = ProductRoutes;
