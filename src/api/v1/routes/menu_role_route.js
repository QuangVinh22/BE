const express = require("express");
const MenuRoleRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postMenuRoleController,
  getMenuRoleController,
  putMenuRoleController,
} = require("../controllers/menu_role_controller");
// const { validateMenuRole } = require("../../middleware/validateMenuRole");
//
const { verifyAccessToken } = require("../services/jwt_service");

MenuRoleRoutes.post(
  "/post",
  verifyAccessToken,
  asyncHandler(postMenuRoleController)
);
MenuRoleRoutes.get(
  "/get",
  verifyAccessToken,
  asyncHandler(getMenuRoleController)
);
MenuRoleRoutes.put(
  "/put",
  verifyAccessToken,
  asyncHandler(putMenuRoleController)
);
// MenuRoleRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteMenuRoleController)
// );

module.exports = MenuRoleRoutes;
