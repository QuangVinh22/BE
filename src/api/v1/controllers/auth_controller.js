const createError = require("http-errors");
const {
  RegisterUserService,
  LoginUserService,
} = require("../services/auth_service.js");
const { OK, CREATED } = require("../../core/success.response.js");
module.exports = {
  AuthLoginController: async (req, res, next) => {
    new OK({
      message: "LOGIN OK!",
      metadata: await LoginUserService(req.body),
    }).send(res);
  },
  AuthRegisterController: async (req, res, next) => {
    new CREATED({
      message: "Register OK!",
      metadata: await RegisterUserService(req.body),
    }).send(res);
  },
};
