const express = require("express");
const RoleRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postRoleController,
  getRoleController,
  putRoleController,
} = require("../controllers/role_controller");
// const { validateRole } = require("../../middleware/validateRole");
//
const { verifyAccessToken } = require("../services/jwt_service");

RoleRoutes.post("/post", verifyAccessToken, asyncHandler(postRoleController));
RoleRoutes.get("/get", verifyAccessToken, asyncHandler(getRoleController));
RoleRoutes.put("/put", verifyAccessToken, asyncHandler(putRoleController));
// RoleRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteRoleController)
// );

module.exports = RoleRoutes;
