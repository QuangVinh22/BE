const express = require("express");
const UserRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postUserController,
  getUserController,
  putUserController,
} = require("../controllers/user_controller");
// const { validateUser } = require("../../middleware/validateUser");
//
const { verifyAccessToken } = require("../services/jwt_service");

UserRoutes.post(
  "/post",
  verifyAccessToken,
  asyncHandler(postUserController)
);
UserRoutes.get(
  "/get",
  verifyAccessToken,
  asyncHandler(getUserController)
);
UserRoutes.put(
  "/put",
  verifyAccessToken,
  asyncHandler(putUserController)
);
// UserRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteUserController)
// );

module.exports = UserRoutes;
