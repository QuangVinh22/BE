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
const { checkRolePermission } = require("../../middleware/role_middleware");
TableRoutes.post(
  "/post",
  verifyAccessToken,
  checkRolePermission("Create"),
  validateTablesPost,
  asyncHandler(postTableController)
);
TableRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getTableController)
);
TableRoutes.put(
  "/put",
  verifyAccessToken,
  checkRolePermission("Update"),
  validateTablesPut,
  asyncHandler(putTableController)
);
// TableRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteTableController)
// );

module.exports = TableRoutes;
