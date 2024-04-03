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
const { checkRolePermission } = require("../../middleware/role_middleware");

FranchiseRoutes.post(
  "/post",
  verifyAccessToken,
  checkRolePermission("Create"),
  validateFranchisePost,

  asyncHandler(postFranchiseController)
);
FranchiseRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getFranchiseController)
);
FranchiseRoutes.put(
  "/put",
  verifyAccessToken,
  checkRolePermission("Update"),
  validateFranchisePut,
  asyncHandler(putFranchiseController)
);
// FranchiseRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteFranchiseController)
// );

module.exports = FranchiseRoutes;
