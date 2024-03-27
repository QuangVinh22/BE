const express = require("express");
const QRRoleRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postQRRoleController,
  getQRRoleController,
  putQRRoleController,
} = require("../controllers/qr_role_controller");
// const { validateQRRole } = require("../../middleware/validateQRRole");
//
const { verifyAccessToken } = require("../services/jwt_service");

QRRoleRoutes.post(
  "/post",
  verifyAccessToken,
  asyncHandler(postQRRoleController)
);
QRRoleRoutes.get("/get", verifyAccessToken, asyncHandler(getQRRoleController));
QRRoleRoutes.put("/put", verifyAccessToken, asyncHandler(putQRRoleController));
// QRRoleRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteQRRoleController)
// );

module.exports = QRRoleRoutes;
