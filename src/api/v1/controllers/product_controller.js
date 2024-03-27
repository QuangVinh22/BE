const { OK, CREATED } = require("../../core/success.response.js");
const {
  createProductsService,
  getProductsService,
  deleteProductService,
  putProductService,
} = require("../services/product_service.js");
module.exports = {
  getProductController: async (req, res, next) => {
    new OK({
      message: "List Products: ",
      metadata: await getProductsService(req.query),
    }).send(res);
  },
  postProductController: async (req, res, next) => {
    new CREATED({
      message: "Created  ",
      metadata: await createProductsService(req.body),
    }).send(res);
  },
  putProductController: async (req, res, next) => {
    new OK({
      message: " Products Updated: ",
      metadata: await putProductService(req.body),
    }).send(res);
  },
  deleteProductController: async (req, res, next) => {
    new OK({
      message: " Products Deleted: ",
      metadata: await deleteProductService(req.body),
    }).send(res);
  },
};
