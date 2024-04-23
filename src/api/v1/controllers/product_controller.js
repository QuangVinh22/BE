const { BadRequestError } = require("../../core/error.response.js");
const { OK, CREATED } = require("../../core/success.response.js");
const {
  createProductsService,
  getProductsService,
  deleteProductService,
  putProductService,
} = require("../services/product_service.js");
//
const path = require("path");

module.exports = {
  getProductController: async (req, res, next) => {
    new OK({
      message: "List Products: ",
      metadata: await getProductsService(req.query),
    }).send(res);
  },
  postProductController: async (req, res, next) => {
    const UserId = req.payload.userId;
    const fullPath = req.file.path;
    const fileName = path.basename(fullPath);

    new CREATED({
      message: "Created  ",
      metadata: await createProductsService(req.body, fileName, UserId),
    }).send(res);
  },
  putProductController: async (req, res, next) => {
    const UserId = req.payload.userId;
    let fileName;
    if (req.file) {
      const fullPath = req.file.path;
      fileName = path.basename(fullPath);
    }

    new OK({
      message: " Products Updated: ",
      metadata: await putProductService(req.body, fileName, UserId),
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
