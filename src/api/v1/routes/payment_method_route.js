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

PaymentMethodRoutes.post(
  "/post",
  verifyAccessToken,
  validatePaymentMethodPost,
  asyncHandler(postPaymentMethodController)
);
PaymentMethodRoutes.get(
  "/get",
  verifyAccessToken,
  asyncHandler(getPaymentMethodController)
);
PaymentMethodRoutes.put(
  "/put",
  verifyAccessToken,
  validatePaymentMethodPut,
  asyncHandler(putPaymentMethodController)
);
// PaymentMethodRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deletePaymentMethodController)
// );

module.exports = PaymentMethodRoutes;
