const express = require("express");
const CatalogueRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postCatalogueController,
  getCatalogueController,
  putCatalogueController,
  deleteCatalogueController,
} = require("../controllers/catalogue_controller");
// const { validateCatalogue } = require("../../middleware/validateCatalogue");
//
const { verifyAccessToken } = require("../services/jwt_service");
const {
  validateCataloguePost,
  validateCataloguePut,
} = require("../../middleware/validate/validateCatalogue");
const { checkRolePermission } = require("../../middleware/role_middleware");
CatalogueRoutes.post(
  "/post",
  verifyAccessToken,
  checkRolePermission("Create"),
  validateCataloguePost,
  asyncHandler(postCatalogueController)
);
CatalogueRoutes.get(
  "/get",
  verifyAccessToken,
  checkRolePermission("Read"),
  asyncHandler(getCatalogueController)
);
CatalogueRoutes.put(
  "/put",
  verifyAccessToken,
  checkRolePermission("Update"),
  validateCataloguePut,
  asyncHandler(putCatalogueController)
);
CatalogueRoutes.delete(
  "/delete/:id",
  verifyAccessToken,
  checkRolePermission("Delete"),
  asyncHandler(deleteCatalogueController)
);

module.exports = CatalogueRoutes;
