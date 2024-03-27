const { OK, CREATED } = require("../../core/success.response.js");
const {
  getRolePermissionService,
  createRolePermissionsService,
  putRolePermissionService,
} = require("../services/role_permission_service.js");
module.exports = {
  getRolePermissionController: async (req, res, next) => {
    new OK({
      message: "List RolePermissions: ",
      metadata: await getRolePermissionService(req.query),
    }).send(res);
  },
  postRolePermissionController: async (req, res, next) => {
    new CREATED({
      message: "Created  ",
      metadata: await createRolePermissionsService(req.body),
    }).send(res);
  },
  putRolePermissionController: async (req, res, next) => {
    new OK({
      message: " RolePermissions Updated: ",
      metadata: await putRolePermissionService(req.body),
    }).send(res);
  },
  // deleteRolePermissionController: async (req, res, next) => {
  //   new OK({
  //     message: " RolePermissions Deleted: ",
  //     metadata: await deleteRolePermissionService(req.body),
  //   }).send(res);
  // },
};
