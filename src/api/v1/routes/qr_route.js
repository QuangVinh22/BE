const express = require("express");
const QRRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postQRController,
  getQRController,
  putQRController,
  deleteQRController,
} = require("../controllers/qr_controller");
const {
  validateQRPost,
  validateQRPut,
} = require("../../middleware/validate/validateQR");

const { verifyAccessToken } = require("../services/jwt_service");
const { checkRolePermission } = require("../../middleware/role_middleware");
QRRoutes.post(
  "/post",
  verifyAccessToken,
  validateQRPost,
  checkRolePermission("Create"),
  asyncHandler(postQRController)
);
QRRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getQRController)
);
QRRoutes.put(
  "/put",
  verifyAccessToken,
  checkRolePermission("Update"),
  validateQRPut,
  asyncHandler(putQRController)
);
QRRoutes.delete(
  "/delete/:id",
  verifyAccessToken,
  checkRolePermission("Delete"),
  asyncHandler(deleteQRController)
);

module.exports = QRRoutes;
