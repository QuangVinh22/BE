const { OK, CREATED } = require("../../core/success.response.js");
const {
  getFranchiseService,
  createFranchisesService,
  putFranchiseService,
} = require("../services/franchise_service.js");
module.exports = {
  getFranchiseController: async (req, res, next) => {
    new OK({
      message: "List Franchises: ",
      metadata: await getFranchiseService(req.query),
    }).send(res);
  },
  postFranchiseController: async (req, res, next) => {
    new CREATED({
      message: "Created  ",
      metadata: await createFranchisesService(req.body),
    }).send(res);
  },
  putFranchiseController: async (req, res, next) => {
    new OK({
      message: " Franchises Updated: ",
      metadata: await putFranchiseService(req.body),
    }).send(res);
  },
  // deleteFranchiseController: async (req, res, next) => {
  //   new OK({
  //     message: " Franchises Deleted: ",
  //     metadata: await deleteFranchiseService(req.body),
  //   }).send(res);
  // },
};
