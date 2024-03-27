const express = require("express");
const FranchiseRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postFranchiseController,
  getFranchiseController,
  putFranchiseController,
} = require("../controllers/franchise_controller");
// const { validateFranchise } = require("../../middleware/validateFranchise");
//
const { verifyAccessToken } = require("../services/jwt_service");

FranchiseRoutes.post(
  "/post",
  verifyAccessToken,
  asyncHandler(postFranchiseController)
);
FranchiseRoutes.get(
  "/get",
  verifyAccessToken,
  asyncHandler(getFranchiseController)
);
FranchiseRoutes.put(
  "/put",
  verifyAccessToken,
  asyncHandler(putFranchiseController)
);
// FranchiseRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteFranchiseController)
// );

module.exports = FranchiseRoutes;
