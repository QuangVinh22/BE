const express = require("express");
const FloorRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postFloorController,
  getFloorController,
  putFloorController,
  getListFloorIdController,
  deleteFloorController,
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
FloorRoutes.get(
  "/getListFloorId",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getListFloorIdController)
);
FloorRoutes.put(
  "/put",
  verifyAccessToken,
  validateFloorsPut,
  checkRolePermission("Update"),
  asyncHandler(putFloorController)
);
FloorRoutes.delete(
  "/delete/:id",
  verifyAccessToken,
  checkRolePermission("Delete"),
  asyncHandler(deleteFloorController)
);

module.exports = FloorRoutes;
