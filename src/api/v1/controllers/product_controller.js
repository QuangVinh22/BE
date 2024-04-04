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
    const UserId = req.payload.userId;
    new CREATED({
      message: "Created  ",
      metadata: await createProductsService(req.body, UserId),
    }).send(res);
  },
  putProductController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new OK({
      message: " Products Updated: ",
      metadata: await putProductService(req.body, UserId),
    }).send(res);
  },
  deleteProductController: async (req, res, next) => {
    const UserId = req.payload.userId;
    const id = req.params.id;
    new OK({
      message: " Products Deleted: ",
      metadata: await deleteProductService(id, UserId),
    }).send(res);
  },
};
