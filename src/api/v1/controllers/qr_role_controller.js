const { OK, CREATED } = require("../../core/success.response.js");
const {
  getQRRoleService,
  createQRRolesService,
  putQRRoleService,
} = require("../services/qr_role_service.js");
module.exports = {
  getQRRoleController: async (req, res, next) => {
    new OK({
      message: "List QRRoles: ",
      metadata: await getQRRoleService(req.query),
    }).send(res);
  },
  postQRRoleController: async (req, res, next) => {
    new CREATED({
      message: "Created  ",
      metadata: await createQRRolesService(req.body),
    }).send(res);
  },
  putQRRoleController: async (req, res, next) => {
    new OK({
      message: " QRRoles Updated: ",
      metadata: await putQRRoleService(req.body),
    }).send(res);
  },
  // deleteQRRoleController: async (req, res, next) => {
  //   new OK({
  //     message: " QRRoles Deleted: ",
  //     metadata: await deleteQRRoleService(req.body),
  //   }).send(res);
  // },
};
