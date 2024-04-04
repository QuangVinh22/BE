const { OK, CREATED } = require("../../core/success.response.js");
const {
  getRolePermissionService,
  createRolePermissionsService,
  putRolePermissionService,
  deleteRolePermissionService,
} = require("../services/role_permission_service.js");
module.exports = {
  getRolePermissionController: async (req, res, next) => {
    new OK({
      message: "List RolePermissions: ",
      metadata: await getRolePermissionService(req.query),
    }).send(res);
  },
  postRolePermissionController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new CREATED({
      message: "Created  ",
      metadata: await createRolePermissionsService(req.body, UserId),
    }).send(res);
  },
  putRolePermissionController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new OK({
      message: " RolePermissions Updated: ",
      metadata: await putRolePermissionService(req.body, UserId),
    }).send(res);
  },
  deleteRolePermissionController: async (req, res, next) => {
    const UserId = req.payload.userId;
    const id = req.params.id;
    new OK({
      message: " RolePermissions Deleted: ",
      metadata: await deleteRolePermissionService(id, UserId),
    }).send(res);
  },
};
