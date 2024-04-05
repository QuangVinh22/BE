const express = require("express");
const CustomerRoutes = express.Router();
const {
  CustomerLoginController,
  CustomerRegisterController,
  getCustomerController,
} = require("../controllers/customer_controller");
const asyncHandler = require("../../middleware/handleError");
const { verifyAccessToken } = require("../services/jwt_service");
const { checkRolePermission } = require("../../middleware/role_middleware");

CustomerRoutes.post(
  "/register",

  asyncHandler(CustomerRegisterController)
);
CustomerRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getCustomerController)
);
CustomerRoutes.post("/login", asyncHandler(CustomerLoginController));

module.exports = CustomerRoutes;
