const express = require("express");
const PaymentMethodRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postPaymentMethodController,
  getPaymentMethodController,
  putPaymentMethodController,
} = require("../controllers/payment_method_controller");
const {
  validatePaymentMethodPost,
  validatePaymentMethodPut,
} = require("../../middleware/validate/validatePayment_Method");

const { verifyAccessToken } = require("../services/jwt_service");
const { checkRolePermission } = require("../../middleware/role_middleware");

PaymentMethodRoutes.post(
  "/post",
  verifyAccessToken,
  checkRolePermission("Create"),
  validatePaymentMethodPost,
  asyncHandler(postPaymentMethodController)
);
PaymentMethodRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getPaymentMethodController)
);
PaymentMethodRoutes.put(
  "/put",
  verifyAccessToken,
  checkRolePermission("Update"),
  validatePaymentMethodPut,
  asyncHandler(putPaymentMethodController)
);
// PaymentMethodRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deletePaymentMethodController)
// );

module.exports = PaymentMethodRoutes;
