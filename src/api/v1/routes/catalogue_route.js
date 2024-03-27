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

CatalogueRoutes.post(
  "/post",
  verifyAccessToken,
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
  asyncHandler(putCatalogueController)
);
// CatalogueRoutes.delete(
//   "/delete",
//   verifyAccessToken,
//   asyncHandler(deleteCatalogueController)
// );

module.exports = CatalogueRoutes;
