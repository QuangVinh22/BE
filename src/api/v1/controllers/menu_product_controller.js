const { OK, CREATED } = require("../../core/success.response.js");
const {
  createMenuProductsService,
  getMenuProductsService,
  putMenuProductService,
} = require("../services/menu_product_service.js");
module.exports = {
  getMenuProductController: async (req, res, next) => {
    new OK({
      message: "List Products: ",
      metadata: await getMenuProductsService(req.query),
    }).send(res);
  },
  postMenuProductController: async (req, res, next) => {
    new CREATED({
      message: "Created  ",
      metadata: await createMenuProductsService(req.body),
    }).send(res);
  },
  putMenuProductController: async (req, res, next) => {
    new OK({
      message: " Products Updated: ",
      metadata: await putMenuProductService(req.body),
    }).send(res);
  },
  //   deleteProductController: async (req, res, next) => {
  //     new CREATED({
  //       message: " Products Deleted: ",
  //       metadata: await deleteProductService(req.body),
  //     }).send(res);
  //   },
};
