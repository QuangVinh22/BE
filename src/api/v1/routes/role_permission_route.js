const express = require("express");
const RolePermissionRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postRolePermissionController,
  getRolePermissionController,
  putRolePermissionController,
} = require("../controllers/role_permission_controller");
const {
  validateRolePermissionsPost,
  validateRolePermissionsPut,
} = require("../../middleware/validate/validateRole_Permission");
//
const { verifyAccessToken } = require("../services/jwt_service");

RolePermissionRoutes.post(
  "/post",
  verifyAccessToken,
  validateRolePermissionsPost,
  asyncHandler(postRolePermissionController)
);
RolePermissionRoutes.get(
  "/get",
  verifyAccessToken,
  asyncHandler(getRolePermissionController)
);
RolePermissionRoutes.put(
  "/put",
  verifyAccessToken,
  validateRolePermissionsPut,
  asyncHandler(putRolePermissionController)
);
// RolePermissionRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteRolePermissionController)
// );

module.exports = RolePermissionRoutes;
