const { OK, CREATED } = require("../../core/success.response.js");
const {
  getFloorService,
  createFloorsService,
  putFloorService,
} = require("../services/floor_service.js");
module.exports = {
  getFloorController: async (req, res, next) => {
    new OK({
      message: "List Floors: ",
      metadata: await getFloorService(req.query),
    }).send(res);
  },
  postFloorController: async (req, res, next) => {
    new CREATED({
      message: "Created  ",
      metadata: await createFloorsService(req.body),
    }).send(res);
  },
  putFloorController: async (req, res, next) => {
    new OK({
      message: " Floors Updated: ",
      metadata: await putFloorService(req.body),
    }).send(res);
  },
  // deleteFloorController: async (req, res, next) => {
  //   new OK({
  //     message: " Floors Deleted: ",
  //     metadata: await deleteFloorService(req.body),
  //   }).send(res);
  // },
};
