const { OK, CREATED } = require("../../core/success.response.js");
const {
  getCatalogueService,
  createCataloguesService,
  putCatalogueService,
  deleteCatalogueService,
} = require("../services/catalogue_service.js");
const path = require("path");
module.exports = {
  getCatalogueController: async (req, res, next) => {
    new OK({
      message: "List Catalogues: ",
      metadata: await getCatalogueService(req.query),
    }).send(res);
  },
  postCatalogueController: async (req, res, next) => {
    const fullPath = req.file.path;
    const fileName = path.basename(fullPath);
    const UserId = req.payload.userId;
    new CREATED({
      message: "Created  ",
      metadata: await createCataloguesService(req.body, fileName, UserId),
    }).send(res);
  },
  putCatalogueController: async (req, res, next) => {
    const fullPath = req.file.path;
    const fileName = path.basename(fullPath);
    const UserId = req.payload.userId;
    new OK({
      message: " Catalogues Updated: ",
      metadata: await putCatalogueService(req.body, fileName, UserId),
    }).send(res);
  },
  deleteCatalogueController: async (req, res, next) => {
    const UserId = req.payload.userId;
    const id = req.params.id;
    new OK({
      message: " Catalogues Deleted: ",
      metadata: await deleteCatalogueService(id, UserId),
    }).send(res);
  },
};
