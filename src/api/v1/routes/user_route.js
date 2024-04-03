const express = require("express");
const UserRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postUserController,
  getUserController,
  putUserController,
} = require("../controllers/user_controller");
// const { validateUser } = require("../../middleware/validateUser");
//
const { verifyAccessToken } = require("../services/jwt_service");
const { checkRolePermission } = require("../../middleware/role_middleware");
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
module.exports = UserRoutes;
