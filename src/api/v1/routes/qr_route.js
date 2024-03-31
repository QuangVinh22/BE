const express = require("express");
const QRRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postQRController,
  getQRController,
  putQRController,
} = require("../controllers/qr_controller");
const {
  validateQRPost,
  validateQRPut,
} = require("../../middleware/validate/validateQR");

const { verifyAccessToken } = require("../services/jwt_service");

QRRoutes.post(
  "/post",
  verifyAccessToken,
  validateQRPost,
  asyncHandler(postQRController)
);
QRRoutes.get("/get", verifyAccessToken, asyncHandler(getQRController));
QRRoutes.put(
  "/put",
  verifyAccessToken,
  validateQRPut,
  asyncHandler(putQRController)
);
// QRRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteQRController)
// );

module.exports = QRRoutes;
