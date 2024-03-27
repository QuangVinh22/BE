const express = require("express");
const PaymentMethodRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postPaymentMethodController,
  getPaymentMethodController,
  putPaymentMethodController,
} = require("../controllers/payment_method_controller");
// const { validatePaymentMethod } = require("../../middleware/validatePaymentMethod");
//
const { verifyAccessToken } = require("../services/jwt_service");

PaymentMethodRoutes.post(
  "/post",
  verifyAccessToken,
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
  asyncHandler(putPaymentMethodController)
);
// PaymentMethodRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deletePaymentMethodController)
// );

module.exports = PaymentMethodRoutes;
