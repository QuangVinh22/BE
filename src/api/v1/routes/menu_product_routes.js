const express = require("express");
const MenuProductRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
const {
  postMenuProductController,
  getMenuProductController,
  putMenuProductController,
} = require("../controllers/menu_product_controller");
const { verifyAccessToken } = require("../services/jwt_service");
const {
  validateMenuProductPost,
  validateMenuProductPut,
} = require("../../middleware/validate/validateMenuProduct");
const { checkRolePermission } = require("../../middleware/role_middleware");

MenuProductRoutes.post(
  "/post",
  verifyAccessToken,
  checkRolePermission("Create"),
  validateMenuProductPost,
  asyncHandler(postMenuProductController)
);
MenuProductRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getMenuProductController)
);
MenuProductRoutes.put(
  "/put",
  verifyAccessToken,
  checkRolePermission("Update"),
  validateMenuProductPut,
  asyncHandler(putMenuProductController)
);
// ProductRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteProductController)
// );

module.exports = MenuProductRoutes;
