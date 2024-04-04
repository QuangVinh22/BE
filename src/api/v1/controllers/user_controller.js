const { OK, CREATED } = require("../../core/success.response.js");
const {
  getUsersService,
  putUsersService,
  deleteUsersService,
} = require("../services/user_service.js");
module.exports = {
  getUserController: async (req, res, next) => {
    new OK({
      message: "List Users: ",
      metadata: await getUsersService(req.query),
    }).send(res);
  },
  putUserController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new OK({
      message: " Users Updated: ",
      metadata: await putUsersService(req.body, UserId),
    }).send(res);
  },
  deleteUserController: async (req, res, next) => {
    const UserId = req.payload.userId;
    const id = req.params.id;
    new OK({
      message: " Users Soft Deleted: ",
      metadata: await deleteUsersService(id, UserId),
    }).send(res);
  },
};
