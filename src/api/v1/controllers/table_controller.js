const { OK, CREATED } = require("../../core/success.response.js");
const {
  createTablesService,
  getTableService,
  putTableService,
  deleteTableService,
  getListTableServiceId,
} = require("../services/table_service.js");
module.exports = {
  getTableController: async (req, res, next) => {
    new OK({
      message: "List Tables: ",
      metadata: await getTableService(req.query),
    }).send(res);
  },
  getListIdTableController: async (req, res, next) => {
    new OK({
      message: "List Tables: ",
      metadata: await getListTableServiceId(req.query),
    }).send(res);
  },
  postTableController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new CREATED({
      message: "Created  ",
      metadata: await createTablesService(req.body, UserId),
    }).send(res);
  },
  putTableController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new OK({
      message: " Tables Updated: ",
      metadata: await putTableService(req.body, UserId),
    }).send(res);
  },
  deleteTableController: async (req, res, next) => {
    const UserId = req.payload.userId;
    const id = req.params.id;
    new OK({
      message: " Tables Deleted: ",
      metadata: await deleteTableService(id, UserId),
    }).send(res);
  },
};
