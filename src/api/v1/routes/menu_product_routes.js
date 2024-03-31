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

MenuProductRoutes.post(
  "/post",
  verifyAccessToken,
  validateMenuProductPost,
  asyncHandler(postMenuProductController)
);
MenuProductRoutes.get(
  "/get",
  verifyAccessToken,
  asyncHandler(getMenuProductController)
);
MenuProductRoutes.put(
  "/put",
  verifyAccessToken,
  validateMenuProductPut,
  asyncHandler(putMenuProductController)
);
// ProductRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteProductController)
// );

module.exports = MenuProductRoutes;
