const { OK, CREATED } = require("../../core/success.response.js");
const {
  getPaymentMethodService,
  createPaymentMethodsService,
  putPaymentMethodService,
  deletePaymentMethodService,
} = require("../services/payment_method_service.js");
module.exports = {
  getPaymentMethodController: async (req, res, next) => {
    new OK({
      message: "List PaymentMethods: ",
      metadata: await getPaymentMethodService(req.query),
    }).send(res);
  },
  postPaymentMethodController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new CREATED({
      message: "Created  ",
      metadata: await createPaymentMethodsService(req.body, UserId),
    }).send(res);
  },
  putPaymentMethodController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new OK({
      message: " PaymentMethods Updated: ",
      metadata: await putPaymentMethodService(req.body, UserId),
    }).send(res);
  },
  deletePaymentMethodController: async (req, res, next) => {
    const UserId = req.payload.userId;
    const id = req.params.id;
    new OK({
      message: " PaymentMethods Deleted: ",
      metadata: await deletePaymentMethodService(id, UserId),
    }).send(res);
  },
};
