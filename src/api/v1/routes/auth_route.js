const express = require("express");
const AuthRoutes = express.Router();
const {
  AuthLoginController,
  AuthRegisterController,
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

  checkRolePermission("Create"),

  asyncHandler(AuthRegisterController)
);
AuthRoutes.post("/login", validateUserLogin, asyncHandler(AuthLoginController));

module.exports = AuthRoutes;
