const { OK, CREATED } = require("../../core/success.response.js");
const {
  getFloorService,
  createFloorsService,
  putFloorService,
  deleteFloorService,
  getListFloorIdService,
} = require("../services/floor_service.js");
module.exports = {
  getFloorController: async (req, res, next) => {
    new OK({
      message: "List Floors: ",
      metadata: await getFloorService(req.query),
    }).send(res);
  },
  getListFloorIdController: async (req, res, next) => {
    new OK({
      message: "List Floors: ",
      metadata: await getListFloorIdService(req.query),
    }).send(res);
  },

  postFloorController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new CREATED({
      message: "Created  ",
      metadata: await createFloorsService(req.body, UserId),
    }).send(res);
  },
  putFloorController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new OK({
      message: " Floors Updated: ",
      metadata: await putFloorService(req.body, UserId),
    }).send(res);
  },
  deleteFloorController: async (req, res, next) => {
    const UserId = req.payload.userId;
    const id = req.params.id;
    new OK({
      message: " Floors Deleted: ",
      metadata: await deleteFloorService(id, UserId),
    }).send(res);
  },
};
