const { OK, CREATED } = require("../../core/success.response.js");
const {
  getRoleService,
  createRolesService,
  putRoleService,
} = require("../services/role_service.js");
module.exports = {
  getRoleController: async (req, res, next) => {
    new OK({
      message: "List Roles: ",
      metadata: await getRoleService(req.query),
    }).send(res);
  },
  postRoleController: async (req, res, next) => {
    new CREATED({
      message: "Created  ",
      metadata: await createRolesService(req.body),
    }).send(res);
  },
  putRoleController: async (req, res, next) => {
    new OK({
      message: " Roles Updated: ",
      metadata: await putRoleService(req.body),
    }).send(res);
  },
  // deleteRoleController: async (req, res, next) => {
  //   new OK({
  //     message: " Roles Deleted: ",
  //     metadata: await deleteRoleService(req.body),
  //   }).send(res);
  // },
};
