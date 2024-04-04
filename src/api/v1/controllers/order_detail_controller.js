const { OK, CREATED } = require("../../core/success.response.js");
const {
  getOrderDetailService,
  createOrderDetailsService,
  putOrderDetailService,
  deleteOrDetailsService,
} = require("../services/order_detail_service.js");
module.exports = {
  getOrderDetailController: async (req, res, next) => {
    new OK({
      message: "List OrderDetails: ",
      metadata: await getOrderDetailService(req.query),
    }).send(res);
  },
  postOrderDetailController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new CREATED({
      message: "Created  ",
      metadata: await createOrderDetailsService(req.body, UserId),
    }).send(res);
  },
  putOrderDetailController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new OK({
      message: " OrderDetails Updated: ",
      metadata: await putOrderDetailService(req.body, UserId),
    }).send(res);
  },
  deleteOrderDetailController: async (req, res, next) => {
    const UserId = req.payload.userId;
    const id = req.params.id;
    new OK({
      message: " OrderDetails Deleted: ",
      metadata: await deleteOrDetailsService(id, UserId),
    }).send(res);
  },
};
