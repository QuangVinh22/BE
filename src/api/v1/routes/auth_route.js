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
} = require("../../middleware/validateAuth");

AuthRoutes.post("/register", asyncHandler(AuthRegisterController));
AuthRoutes.post("/login", validateUserLogin, asyncHandler(AuthLoginController));

module.exports = AuthRoutes;
