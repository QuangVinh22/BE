const express = require("express");
const OrderRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postOrderController,
  getOrderController,
  putOrderController,
  deleteOrderController,
} = require("../controllers/order_controller");
const {
  validateOrdersPost,
  validateOrdersPut,
} = require("../../middleware/validate/validateOrder");

const { verifyAccessToken } = require("../services/jwt_service");
const { checkRolePermission } = require("../../middleware/role_middleware");
const { upload } = require("../../utils/imageUtils");

OrderRoutes.post(
  "/post",
  verifyAccessToken,
  upload.single("image"),
  checkRolePermission("Create"),
  validateOrdersPost,
  asyncHandler(postOrderController)
);
OrderRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getOrderController)
);
OrderRoutes.put(
  "/put",
  verifyAccessToken,
  upload.single("image"),
  checkRolePermission("Update"),
  validateOrdersPut,
  asyncHandler(putOrderController)
);
OrderRoutes.delete(
  "/delete/:id",
  verifyAccessToken,
  checkRolePermission("Delete"),
  asyncHandler(deleteOrderController)
);

module.exports = OrderRoutes;
