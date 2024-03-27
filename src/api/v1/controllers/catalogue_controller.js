const { OK, CREATED } = require("../../core/success.response.js");
const {
  getCatalogueService,
  createCataloguesService,
  putCatalogueService,
} = require("../services/catalogue_service.js");
module.exports = {
  getCatalogueController: async (req, res, next) => {
    new OK({
      message: "List Catalogues: ",
      metadata: await getCatalogueService(req.query),
    }).send(res);
  },
  postCatalogueController: async (req, res, next) => {
    new CREATED({
      message: "Created  ",
      metadata: await createCataloguesService(req.body),
    }).send(res);
  },
  putCatalogueController: async (req, res, next) => {
    new OK({
      message: " Catalogues Updated: ",
      metadata: await putCatalogueService(req.body),
    }).send(res);
  },
  // deleteCatalogueController: async (req, res, next) => {
  //   new OK({
  //     message: " Catalogues Deleted: ",
  //     metadata: await deleteCatalogueService(req.body),
  //   }).send(res);
  // },
};
