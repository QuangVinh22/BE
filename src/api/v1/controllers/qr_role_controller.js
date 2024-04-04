const { OK, CREATED } = require("../../core/success.response.js");
const {
  getQRRoleService,
  createQRRolesService,
  putQRRoleService,
  deleteQrRoleService,
} = require("../services/qr_role_service.js");
module.exports = {
  getQRRoleController: async (req, res, next) => {
    new OK({
      message: "List QRRoles: ",
      metadata: await getQRRoleService(req.query),
    }).send(res);
  },
  postQRRoleController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new CREATED({
      message: "Created  ",
      metadata: await createQRRolesService(req.body, UserId),
    }).send(res);
  },
  putQRRoleController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new OK({
      message: " QRRoles Updated: ",
      metadata: await putQRRoleService(req.body, UserId),
    }).send(res);
  },
  deleteQRRoleController: async (req, res, next) => {
    const UserId = req.payload.userId;
    const id = req.params.id;
    new OK({
      message: " QRRoles Deleted: ",
      metadata: await deleteQrRoleService(id, UserId),
    }).send(res);
  },
};
