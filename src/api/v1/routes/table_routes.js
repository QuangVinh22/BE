const express = require("express");
const TableRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postTableController,
  getTableController,
  putTableController,
  deleteTableController,
  getListIdTableController,
} = require("../controllers/table_controller");
const {
  validateTablesPost,
  validateTablesPut,
} = require("../../middleware/validate/validateTable");

const { verifyAccessToken } = require("../services/jwt_service");
const { checkRolePermission } = require("../../middleware/role_middleware");
const {
  checkMenuRolePermission,
} = require("../../middleware/menu_role/menu_role_middleware");
TableRoutes.post(
  "/post",
  verifyAccessToken,
  checkRolePermission("Create"),
  validateTablesPost,
  // checkMenuRolePermission(),
  asyncHandler(postTableController)
);
TableRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getTableController)
);
TableRoutes.get(
  "/getListId",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getListIdTableController)
);

TableRoutes.put(
  "/put",
  verifyAccessToken,
  checkRolePermission("Update"),
  validateTablesPut,
  asyncHandler(putTableController)
);
TableRoutes.delete(
  "/delete/:id",
  verifyAccessToken,
  checkRolePermission("Delete"),
  checkMenuRolePermission(),
  asyncHandler(deleteTableController)
);

module.exports = TableRoutes;
