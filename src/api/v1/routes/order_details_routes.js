const express = require("express");
const OrderDetailRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postOrderDetailController,
  getOrderDetailController,
  putOrderDetailController,
} = require("../controllers/order_detail_controller");
// const { validateOrderDetail } = require("../../middleware/validateOrderDetail");
//
const { verifyAccessToken } = require("../services/jwt_service");

OrderDetailRoutes.post(
  "/post",
  verifyAccessToken,
  asyncHandler(postOrderDetailController)
);
OrderDetailRoutes.get(
  "/get",
  verifyAccessToken,
  asyncHandler(getOrderDetailController)
);
OrderDetailRoutes.put(
  "/put",
  verifyAccessToken,
  asyncHandler(putOrderDetailController)
);
// OrderDetailRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteOrderDetailController)
// );

module.exports = OrderDetailRoutes;
