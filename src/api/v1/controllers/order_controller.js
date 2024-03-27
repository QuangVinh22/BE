const { OK, CREATED } = require("../../core/success.response.js");
const {
  getOrderService,
  createOrdersService,
  putOrderService,
} = require("../services/order_service.js");
module.exports = {
  getOrderController: async (req, res, next) => {
    new OK({
      message: "List Orders: ",
      metadata: await getOrderService(req.query),
    }).send(res);
  },
  postOrderController: async (req, res, next) => {
    new CREATED({
      message: "Created  ",
      metadata: await createOrdersService(req.body),
    }).send(res);
  },
  putOrderController: async (req, res, next) => {
    new OK({
      message: " Orders Updated: ",
      metadata: await putOrderService(req.body),
    }).send(res);
  },
  // deleteOrderController: async (req, res, next) => {
  //   new OK({
  //     message: " Orders Deleted: ",
  //     metadata: await deleteOrderService(req.body),
  //   }).send(res);
  // },
};
