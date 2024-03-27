const express = require("express");
const OrderRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postOrderController,
  getOrderController,
  putOrderController,
} = require("../controllers/order_controller");
// const { validateOrder } = require("../../middleware/validateOrder");
//
const { verifyAccessToken } = require("../services/jwt_service");

OrderRoutes.post(
  "/post",
  verifyAccessToken,
  asyncHandler(postOrderController)
);
OrderRoutes.get(
  "/get",
  verifyAccessToken,
  asyncHandler(getOrderController)
);
OrderRoutes.put(
  "/put",
  verifyAccessToken,
  asyncHandler(putOrderController)
);
// OrderRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteOrderController)
// );

module.exports = OrderRoutes;
