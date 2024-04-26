const express = require("express");
const MenuProductRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
const {
  postMenuProductController,
  getMenuProductController,
  putMenuProductController,
  getMenuProductByCatalogueController,

  deleteMenuProductController,
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
MenuProductRoutes.get(
  "/getByCatalogue",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getMenuProductByCatalogueController)
);
MenuProductRoutes.put(
  "/put",
  verifyAccessToken,
  checkRolePermission("Update"),
  validateMenuProductPut,
  asyncHandler(putMenuProductController)
);
MenuProductRoutes.delete(
  "/delete/:id",
  verifyAccessToken,
  checkRolePermission("Delete"),
  asyncHandler(deleteMenuProductController)
);

module.exports = MenuProductRoutes;
