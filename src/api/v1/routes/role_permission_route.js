const express = require("express");
const RolePermissionRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postRolePermissionController,
  getRolePermissionController,
  putRolePermissionController,
  deleteRolePermissionController,
} = require("../controllers/role_permission_controller");
const {
  validateRolePermissionsPost,
  validateRolePermissionsPut,
} = require("../../middleware/validate/validateRole_Permission");
//
const { checkRolePermission } = require("../../middleware/role_middleware");
//
const { verifyAccessToken } = require("../services/jwt_service");

RolePermissionRoutes.post(
  "/post",
  verifyAccessToken,
  checkRolePermission("Create"),
  validateRolePermissionsPost,
  asyncHandler(postRolePermissionController)
);
RolePermissionRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getRolePermissionController)
);
RolePermissionRoutes.put(
  "/put",
  verifyAccessToken,
  checkRolePermission("Update"),
  validateRolePermissionsPut,
  asyncHandler(putRolePermissionController)
);
RolePermissionRoutes.delete(
  "/delete/:id",
  verifyAccessToken,
  checkRolePermission("Delete"),
  asyncHandler(deleteRolePermissionController)
);

module.exports = RolePermissionRoutes;
