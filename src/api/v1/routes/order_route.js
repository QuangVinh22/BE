const express = require("express");
const OrderRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postOrderController,
  getOrderController,
  putOrderController,
} = require("../controllers/order_controller");
const {
  validateOrdersPost,
  validateOrdersPut,
} = require("../../middleware/validate/validateOrder");

const { verifyAccessToken } = require("../services/jwt_service");

OrderRoutes.post(
  "/post",
  verifyAccessToken,
  validateOrdersPost,
  asyncHandler(postOrderController)
);
OrderRoutes.get("/get", verifyAccessToken, asyncHandler(getOrderController));
OrderRoutes.put(
  "/put",
  verifyAccessToken,
  validateOrdersPut,
  asyncHandler(putOrderController)
);
// OrderRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteOrderController)
// );

module.exports = OrderRoutes;
