const express = require("express");
const AuthRoutes = express.Router();
const {
  AuthLoginController,
  AuthRegisterController,
  refreshTokenController,
} = require("../controllers/auth_controller");
const asyncHandler = require("../../middleware/handleError");
const {
  validateUserRegistration,
  validateUserLogin,
} = require("../../middleware/validate/validateAuth");
const { checkRolePermission } = require("../../middleware/role_middleware");
const { verifyAccessToken } = require("../services/jwt_service");

AuthRoutes.post(
  "/register",
  verifyAccessToken,

  // checkRolePermission("Create"),

  asyncHandler(AuthRegisterController)
);
AuthRoutes.post("/login", validateUserLogin, asyncHandler(AuthLoginController));
AuthRoutes.post("/refresh-token", asyncHandler(refreshTokenController));

module.exports = AuthRoutes;
