const express = require("express");
const FranchiseRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postFranchiseController,
  getFranchiseController,
  putFranchiseController,
} = require("../controllers/franchise_controller");
const {
  validateFranchisePut,
  validateFranchisePost,
} = require("../../middleware/validate/validateFranchise");
//
const { verifyAccessToken } = require("../services/jwt_service");

FranchiseRoutes.post(
  "/post",
  verifyAccessToken,
  validateFranchisePost,

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
  validateFranchisePut,
  asyncHandler(putFranchiseController)
);
// FranchiseRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteFranchiseController)
// );

module.exports = FranchiseRoutes;
