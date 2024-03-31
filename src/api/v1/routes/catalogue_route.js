const express = require("express");
const CatalogueRoutes = express.Router();
const asyncHandler = require("../../middleware/handleError");
//
const {
  postCatalogueController,
  getCatalogueController,
  putCatalogueController,
} = require("../controllers/catalogue_controller");
// const { validateCatalogue } = require("../../middleware/validateCatalogue");
//
const { verifyAccessToken } = require("../services/jwt_service");
const {
  validateCataloguePost,
  validateCataloguePut,
} = require("../../middleware/validate/validateCatalogue");
CatalogueRoutes.post(
  "/post",
  verifyAccessToken,
  validateCataloguePost,
  asyncHandler(postCatalogueController)
);
CatalogueRoutes.get(
  "/get",
  verifyAccessToken,
  asyncHandler(getCatalogueController)
);
CatalogueRoutes.put(
  "/put",
  verifyAccessToken,
  validateCataloguePut,
  asyncHandler(putCatalogueController)
);
// CatalogueRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteCatalogueController)
// );

module.exports = CatalogueRoutes;
