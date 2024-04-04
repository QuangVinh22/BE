const { OK, CREATED } = require("../../core/success.response.js");
const {
  getRoleService,
  createRolesService,
  putRoleService,
  deleteRoleService,
} = require("../services/role_service.js");
module.exports = {
  getRoleController: async (req, res, next) => {
    new OK({
      message: "List Roles: ",
      metadata: await getRoleService(req.query),
    }).send(res);
  },
  postRoleController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new CREATED({
      message: "Created  ",
      metadata: await createRolesService(req.body, UserId),
    }).send(res);
  },
  putRoleController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new OK({
      message: " Roles Updated: ",
      metadata: await putRoleService(req.body, UserId),
    }).send(res);
  },
  deleteRoleController: async (req, res, next) => {
    const UserId = req.payload.userId;
    const id = req.params.id;
    new OK({
      message: " Roles Deleted: ",
      metadata: await deleteRoleService(id, UserId),
    }).send(res);
  },
};
