const createError = require("http-errors");
const {
  RegisterCustomerService,
  LoginCustomerService,
  getCustomerService,
} = require("../services/customer_service.js");
const { OK, CREATED } = require("../../core/success.response.js");
module.exports = {
  CustomerLoginController: async (req, res, next) => {
    new OK({
      message: "LOGIN OK!",
      metadata: await LoginCustomerService(req.body),
    }).send(res);
  },
  CustomerRegisterController: async (req, res, next) => {
    new CREATED({
      message: "Register OK!",
      metadata: await RegisterCustomerService(req.body),
    }).send(res);
  },
  getCustomerController: async (req, res, next) => {
    new OK({
      message: "List Customer: ",
      metadata: await getCustomerService(req.query),
    }).send(res);
  },
};
