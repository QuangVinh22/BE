const express = require("express");
const RoleRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postRoleController,
  getRoleController,
  putRoleController,
} = require("../controllers/role_controller");
const {
  validateRolePost,
  validateRolePut,
} = require("../../middleware/validate/validateRole");
//
const { verifyAccessToken } = require("../services/jwt_service");
const { checkRolePermission } = require("../../middleware/role_middleware");
RoleRoutes.post(
  "/post",
  verifyAccessToken,
  checkRolePermission("Create"),
  validateRolePost,
  asyncHandler(postRoleController)
);
RoleRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getRoleController)
);
RoleRoutes.put(
  "/put",
  verifyAccessToken,
  checkRolePermission("Update"),
  validateRolePut,
  asyncHandler(putRoleController)
);
// RoleRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteRoleController)
// );

module.exports = RoleRoutes;
