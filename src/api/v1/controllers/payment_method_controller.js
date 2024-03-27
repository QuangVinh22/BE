const { OK, CREATED } = require("../../core/success.response.js");
const {
  getPaymentMethodService,
  createPaymentMethodsService,
  putPaymentMethodService,
} = require("../services/payment_method_service.js");
module.exports = {
  getPaymentMethodController: async (req, res, next) => {
    new OK({
      message: "List PaymentMethods: ",
      metadata: await getPaymentMethodService(req.query),
    }).send(res);
  },
  postPaymentMethodController: async (req, res, next) => {
    new CREATED({
      message: "Created  ",
      metadata: await createPaymentMethodsService(req.body),
    }).send(res);
  },
  putPaymentMethodController: async (req, res, next) => {
    new OK({
      message: " PaymentMethods Updated: ",
      metadata: await putPaymentMethodService(req.body),
    }).send(res);
  },
  // deletePaymentMethodController: async (req, res, next) => {
  //   new OK({
  //     message: " PaymentMethods Deleted: ",
  //     metadata: await deletePaymentMethodService(req.body),
  //   }).send(res);
  // },
};
