const { OK, CREATED } = require("../../core/success.response.js");
const {
  getFranchiseService,
  createFranchisesService,
  putFranchiseService,
  deleteFranchiseService,
  getListFranchiseIdService,
} = require("../services/franchise_service.js");
module.exports = {
  getFranchiseController: async (req, res, next) => {
    new OK({
      message: "List Franchises: ",
      metadata: await getFranchiseService(req.query),
    }).send(res);
  },
  getListFranchiseIdController: async (req, res, next) => {
    new OK({
      message: "List Franchises: ",
      metadata: await getListFranchiseIdService(req.query),
    }).send(res);
  },

  postFranchiseController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new CREATED({
      message: "Created  ",
      metadata: await createFranchisesService(req.body, UserId),
    }).send(res);
  },
  putFranchiseController: async (req, res, next) => {
    const UserId = req.payload.userId;
    new OK({
      message: " Franchises Updated: ",
      metadata: await putFranchiseService(req.body, UserId),
    }).send(res);
  },
  deleteFranchiseController: async (req, res, next) => {
    const UserId = req.payload.userId;
    const id = req.params.id;
    new OK({
      message: " Franchises Deleted: ",
      metadata: await deleteFranchiseService(id, UserId),
    }).send(res);
  },
};
