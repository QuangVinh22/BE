const express = require("express");
const MenuRoleRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postMenuRoleController,
  getMenuRoleController,
  putMenuRoleController,
  deleteMenuRoleController,
} = require("../controllers/menu_role_controller");
const {
  validateMenuRolePost,
  validateMenuRolePut,
} = require("../../middleware/validate/validateMenu_Role");
//
const { verifyAccessToken } = require("../services/jwt_service");
const { checkRolePermission } = require("../../middleware/role_middleware");

MenuRoleRoutes.post(
  "/post",
  verifyAccessToken,
  validateMenuRolePost,
  checkRolePermission("Create"),
  asyncHandler(postMenuRoleController)
);
MenuRoleRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getMenuRoleController)
);
MenuRoleRoutes.put(
  "/put",
  verifyAccessToken,
  checkRolePermission("Update"),
  validateMenuRolePut,
  asyncHandler(putMenuRoleController)
);
MenuRoleRoutes.delete(
  "/delete/:id",
  verifyAccessToken,
  checkRolePermission("Delete"),
  asyncHandler(deleteMenuRoleController)
);

module.exports = MenuRoleRoutes;
