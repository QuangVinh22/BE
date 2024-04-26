const { OK, CREATED } = require("../../core/success.response.js");
const {
  createMenuProductsService,
  getMenuProductsService,
  putMenuProductService,
  deleteMenuProductService,
  getMenuProductsByCatalogueService,
} = require("../services/menu_product_service.js");
module.exports = {
  getMenuProductController: async (req, res, next) => {
    new OK({
      message: "List Products: ",
      metadata: await getMenuProductsService(req.query),
    }).send(res);
  },
  getMenuProductByCatalogueController: async (req, res, next) => {
    new OK({
      message: "List Products: ",
      metadata: await getMenuProductsByCatalogueService(req.query),
    }).send(res);
  },

  postMenuProductController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new CREATED({
      message: "Created  ",
      metadata: await createMenuProductsService(req.body, UserId),
    }).send(res);
  },
  putMenuProductController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new OK({
      message: " Products Updated: ",
      metadata: await putMenuProductService(req.body, UserId),
    }).send(res);
  },
  deleteMenuProductController: async (req, res, next) => {
    const UserId = req.payload.userId;
    const id = req.params.id;
    new CREATED({
      message: " Products Deleted: ",
      metadata: await deleteMenuProductService(id, UserId),
    }).send(res);
  },
};
