const { OK, CREATED } = require("../../core/success.response.js");
const {
  getMenuRoleService,
  createMenuRolesService,
  putMenuRoleService,
  deleteMenuRoleService,
} = require("../services/menu_role_service.js");
module.exports = {
  getMenuRoleController: async (req, res, next) => {
    new OK({
      message: "List MenuRoles: ",
      metadata: await getMenuRoleService(req.query),
    }).send(res);
  },
  postMenuRoleController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new CREATED({
      message: "Created  ",
      metadata: await createMenuRolesService(req.body, UserId),
    }).send(res);
  },
  putMenuRoleController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new OK({
      message: " MenuRoles Updated: ",
      metadata: await putMenuRoleService(req.body, UserId),
    }).send(res);
  },
  deleteMenuRoleController: async (req, res, next) => {
    const UserId = req.payload.userId;
    const id = req.params.id;
    new OK({
      message: " MenuRoles Deleted: ",
      metadata: await deleteMenuRoleService(id, UserId),
    }).send(res);
  },
};
