const { OK, CREATED } = require("../../core/success.response.js");
const {
  createTablesService,
  getTableService,
  putTableService,
} = require("../services/table_service.js");
module.exports = {
  getTableController: async (req, res, next) => {
    new OK({
      message: "List Tables: ",
      metadata: await getTableService(req.query),
    }).send(res);
  },
  postTableController: async (req, res, next) => {
    new CREATED({
      message: "Created  ",
      metadata: await createTablesService(req.body),
    }).send(res);
  },
  putTableController: async (req, res, next) => {
    new OK({
      message: " Tables Updated: ",
      metadata: await putTableService(req.body),
    }).send(res);
  },
  // deleteTableController: async (req, res, next) => {
  //   new OK({
  //     message: " Tables Deleted: ",
  //     metadata: await deleteTableService(req.body),
  //   }).send(res);
  // },
};
