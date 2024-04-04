const express = require("express");
const OrderDetailRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postOrderDetailController,
  getOrderDetailController,
  putOrderDetailController,
  deleteOrderDetailController,
} = require("../controllers/order_detail_controller");
const {
  validateOrdersDetailPost,
  validateOrdersDetailPut,
} = require("../../middleware/validate/validateOrderDetails");
//
const { verifyAccessToken } = require("../services/jwt_service");
const { checkRolePermission } = require("../../middleware/role_middleware");

OrderDetailRoutes.post(
  "/post",
  verifyAccessToken,
  checkRolePermission("Create"),
  validateOrdersDetailPost,
  asyncHandler(postOrderDetailController)
);
OrderDetailRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getOrderDetailController)
);
OrderDetailRoutes.put(
  "/put",
  verifyAccessToken,
  validateOrdersDetailPut,
  checkRolePermission("Update"),
  asyncHandler(putOrderDetailController)
);
OrderDetailRoutes.delete(
  "/delete/:id",
  verifyAccessToken,
  checkRolePermission("Delete"),
  asyncHandler(deleteOrderDetailController)
);

module.exports = OrderDetailRoutes;
