const express = require("express");
const RolePermissionRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postRolePermissionController,
  getRolePermissionController,
  putRolePermissionController,
} = require("../controllers/role_permission_controller");
// const { validateRolePermission } = require("../../middleware/validateRolePermission");
//
const { verifyAccessToken } = require("../services/jwt_service");

RolePermissionRoutes.post(
  "/post",
  verifyAccessToken,
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
  asyncHandler(putRolePermissionController)
);
// RolePermissionRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteRolePermissionController)
// );

module.exports = RolePermissionRoutes;
