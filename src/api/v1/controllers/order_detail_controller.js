const { OK, CREATED } = require("../../core/success.response.js");
const {
  getOrderDetailService,
  createOrderDetailsService,
  putOrderDetailService,
} = require("../services/order_detail_service.js");
module.exports = {
  getOrderDetailController: async (req, res, next) => {
    new OK({
      message: "List OrderDetails: ",
      metadata: await getOrderDetailService(req.query),
    }).send(res);
  },
  postOrderDetailController: async (req, res, next) => {
    new CREATED({
      message: "Created  ",
      metadata: await createOrderDetailsService(req.body),
    }).send(res);
  },
  putOrderDetailController: async (req, res, next) => {
    new OK({
      message: " OrderDetails Updated: ",
      metadata: await putOrderDetailService(req.body),
    }).send(res);
  },
  // deleteOrderDetailController: async (req, res, next) => {
  //   new OK({
  //     message: " OrderDetails Deleted: ",
  //     metadata: await deleteOrderDetailService(req.body),
  //   }).send(res);
  // },
};
