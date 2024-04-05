const { PrismaClient } = require("@prisma/client");

const { BadRequestError, FORBIDDEN } = require("../../core/error.response");
const prisma = new PrismaClient();

module.exports = {
  checkMenuRolePermission: () => {
    return async (req, res, next) => {
      const functionUrl = req.baseUrl + req.path;
      console.log(functionUrl);
      const permission = await prisma.menu_role.findFirst({
        where: {
          function_url: functionUrl,
        },
      });
      if (!permission) {
        const error = new FORBIDDEN("User Không có quyền truy cập menu này");
        next(error);
      }
      next();
    };
  },
};
