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

FloorRoutes.post(
  "/post",
  verifyAccessToken,
  validateFloorsPost,
  asyncHandler(postFloorController)
);
FloorRoutes.get("/get", verifyAccessToken, asyncHandler(getFloorController));
FloorRoutes.put(
  "/put",
  verifyAccessToken,
  validateFloorsPut,
  asyncHandler(putFloorController)
);
// FloorRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteFloorController)
// );

module.exports = FloorRoutes;
