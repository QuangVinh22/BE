const { OK, CREATED } = require("../../core/success.response.js");
const {
  getQRService,
  createQRsService,
  putQRService,
} = require("../services/qr_service.js");
module.exports = {
  getQRController: async (req, res, next) => {
    new OK({
      message: "List QRs: ",
      metadata: await getQRService(req.query),
    }).send(res);
  },
  postQRController: async (req, res, next) => {
    new CREATED({
      message: "Created  ",
      metadata: await createQRsService(req.body),
    }).send(res);
  },
  putQRController: async (req, res, next) => {
    new OK({
      message: " QRs Updated: ",
      metadata: await putQRService(req.body),
    }).send(res);
  },
  // deleteQRController: async (req, res, next) => {
  //   new OK({
  //     message: " QRs Deleted: ",
  //     metadata: await deleteQRService(req.body),
  //   }).send(res);
  // },
};
