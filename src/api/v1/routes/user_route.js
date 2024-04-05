const express = require("express");
const UserRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postUserController,
  getUserController,
  putUserController,
  deleteUserController,
} = require("../controllers/user_controller");
// const { validateUser } = require("../../middleware/validateUser");
//
const { verifyAccessToken } = require("../services/jwt_service");
const { checkRolePermission } = require("../../middleware/role_middleware");
const {
  checkMenuRolePermission,
} = require("../../middleware/menu_role/menu_role_middleware");
UserRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getUserController)
);
UserRoutes.put(
  "/put",
  verifyAccessToken,
  checkRolePermission("Update"),
  asyncHandler(putUserController)
);
UserRoutes.delete(
  "/delete/:id",
  verifyAccessToken,
  checkRolePermission("Delete"),
  checkMenuRolePermission(),
  asyncHandler(deleteUserController)
);

module.exports = UserRoutes;
