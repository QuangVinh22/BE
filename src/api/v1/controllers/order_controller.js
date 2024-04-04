const { OK, CREATED } = require("../../core/success.response.js");
const {
  getOrderService,
  createOrdersService,
  putOrderService,
  deleteOrderService,
} = require("../services/order_service.js");
module.exports = {
  getOrderController: async (req, res, next) => {
    new OK({
      message: "List Orders: ",
      metadata: await getOrderService(req.query),
    }).send(res);
  },
  postOrderController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new CREATED({
      message: "Created  ",
      metadata: await createOrdersService(req.body, UserId),
    }).send(res);
  },
  putOrderController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new OK({
      message: " Orders Updated: ",
      metadata: await putOrderService(req.body, UserId),
    }).send(res);
  },
  deleteOrderController: async (req, res, next) => {
    const UserId = req.payload.userId;
    const id = req.params.id;
    new OK({
      message: " Orders Deleted: ",
      metadata: await deleteOrderService(id, UserId),
    }).send(res);
  },
};
