const { OK, CREATED } = require("../../core/success.response.js");
const {
  getQRService,
  createQRsService,
  putQRService,
  deleteQRService,
  createQRsByTableService,
} = require("../services/qr_service.js");
module.exports = {
  getQRController: async (req, res, next) => {
    new OK({
      message: "List QRs: ",
      metadata: await getQRService(req.query),
    }).send(res);
  },
  postQRController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new CREATED({
      message: "Created  ",
      metadata: await createQRsService(req.body, UserId),
    }).send(res);
  },
  postQRTableController: async (req, res, next) => {
    const UserId = req.payload.userId;

    new CREATED({
      message: "Created  ",
      metadata: await createQRsByTableService(req.body, UserId),
    }).send(res);
  },
  putQRController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new OK({
      message: " QRs Updated: ",
      metadata: await putQRService(req.body, UserId),
    }).send(res);
  },
  deleteQRController: async (req, res, next) => {
    const UserId = req.payload.userId;
    const id = req.params.id;
    new OK({
      message: " QRs Deleted: ",
      metadata: await deleteQRService(id, UserId),
    }).send(res);
  },
};
