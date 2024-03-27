const { OK, CREATED } = require("../../core/success.response.js");
const {
  getMenuRoleService,
  createMenuRolesService,
  putMenuRoleService,
} = require("../services/menu_role_service.js");
module.exports = {
  getMenuRoleController: async (req, res, next) => {
    new OK({
      message: "List MenuRoles: ",
      metadata: await getMenuRoleService(req.query),
    }).send(res);
  },
  postMenuRoleController: async (req, res, next) => {
    new CREATED({
      message: "Created  ",
      metadata: await createMenuRolesService(req.body),
    }).send(res);
  },
  putMenuRoleController: async (req, res, next) => {
    new OK({
      message: " MenuRoles Updated: ",
      metadata: await putMenuRoleService(req.body),
    }).send(res);
  },
  // deleteMenuRoleController: async (req, res, next) => {
  //   new OK({
  //     message: " MenuRoles Deleted: ",
  //     metadata: await deleteMenuRoleService(req.body),
  //   }).send(res);
  // },
};
