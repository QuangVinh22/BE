const express = require("express");
const QRRoleRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postQRRoleController,
  getQRRoleController,
  putQRRoleController,
  deleteQRRoleController,
} = require("../controllers/qr_role_controller");
const {
  validateQRRolePost,
  validateQRRolePut,
} = require("../../middleware/validate/validateQR_role");

const { verifyAccessToken } = require("../services/jwt_service");
const { checkRolePermission } = require("../../middleware/role_middleware");

QRRoleRoutes.post(
  "/post",
  verifyAccessToken,
  checkRolePermission("Create"),
  validateQRRolePost,
  asyncHandler(postQRRoleController)
);
QRRoleRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getQRRoleController)
);
QRRoleRoutes.put(
  "/put",
  verifyAccessToken,
  checkRolePermission("Update"),
  validateQRRolePut,
  asyncHandler(putQRRoleController)
);
QRRoleRoutes.delete(
  "/delete/:id",
  verifyAccessToken,
  checkRolePermission("Delete"),
  asyncHandler(deleteQRRoleController)
);

module.exports = QRRoleRoutes;
