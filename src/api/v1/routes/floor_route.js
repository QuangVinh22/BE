const express = require("express");
const FloorRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postFloorController,
  getFloorController,
  putFloorController,
} = require("../controllers/floor_controller");
const {
  validateFloorsPost,
  validateFloorsPut,
} = require("../../middleware/validate/validateFloor");

const { verifyAccessToken } = require("../services/jwt_service");
const { checkRolePermission } = require("../../middleware/role_middleware");

FloorRoutes.post(
  "/post",
  verifyAccessToken,
  checkRolePermission("Create"),
  validateFloorsPost,
  asyncHandler(postFloorController)
);
FloorRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getFloorController)
);
FloorRoutes.put(
  "/put",
  verifyAccessToken,
  validateFloorsPut,
  checkRolePermission("Update"),
  asyncHandler(putFloorController)
);
// FloorRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteFloorController)
// );

module.exports = FloorRoutes;
