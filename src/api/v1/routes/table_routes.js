const express = require("express");
const TableRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postTableController,
  getTableController,
  putTableController,
} = require("../controllers/table_controller");
const {
  validateTablesPost,
  validateTablesPut,
} = require("../../middleware/validate/validateTable");

const { verifyAccessToken } = require("../services/jwt_service");

TableRoutes.post(
  "/post",
  verifyAccessToken,
  validateTablesPost,
  asyncHandler(postTableController)
);
TableRoutes.get("/get", verifyAccessToken, asyncHandler(getTableController));
TableRoutes.put(
  "/put",
  verifyAccessToken,
  validateTablesPut,
  asyncHandler(putTableController)
);
// TableRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteTableController)
// );

module.exports = TableRoutes;
