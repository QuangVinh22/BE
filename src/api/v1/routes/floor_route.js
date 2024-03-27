const express = require("express");
const FloorRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postFloorController,
  getFloorController,
  putFloorController,
} = require("../controllers/floor_controller");
// const { validateFloor } = require("../../middleware/validateFloor");
//
const { verifyAccessToken } = require("../services/jwt_service");

FloorRoutes.post("/post", verifyAccessToken, asyncHandler(postFloorController));
FloorRoutes.get("/get", verifyAccessToken, asyncHandler(getFloorController));
FloorRoutes.put("/put", verifyAccessToken, asyncHandler(putFloorController));
// FloorRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteFloorController)
// );

module.exports = FloorRoutes;
