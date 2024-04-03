const { OK, CREATED } = require("../../core/success.response.js");
const {
  getUsersService,
  putUsersService,
} = require("../services/user_service.js");
module.exports = {
  getUserController: async (req, res, next) => {
    new OK({
      message: "List Users: ",
      metadata: await getUsersService(req.query),
    }).send(res);
  },
  putUserController: async (req, res, next) => {
    new OK({
      message: " Users Updated: ",
      metadata: await putUsersService(req.body),
    }).send(res);
  },
};
