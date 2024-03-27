const express = require("express");
const MenuProductRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
const {
  postMenuProductController,
  getMenuProductController,
  putMenuProductController,
} = require("../controllers/menu_product_controller");
const { verifyAccessToken } = require("../services/jwt_service");
MenuProductRoutes.post(
  "/post",
  verifyAccessToken,
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
  asyncHandler(putMenuProductController)
);
// ProductRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteProductController)
// );

module.exports = MenuProductRoutes;
