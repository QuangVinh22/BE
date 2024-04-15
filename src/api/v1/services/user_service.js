const { PrismaClient } = require("@prisma/client");
const { format } = require("date-fns");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
const aqp = require("api-query-params");
const {
  validateRefFranchise,
  validatedUserId,
} = require("../../middleware/validate/validateReferencer");
const { OK } = require("../../core/success.response");
const { buildWhereClause } = require("../../utils/searchUtils");

module.exports = {
  getUsersService: async (queryParams) => {
    const { filterField, operator, value, page, limit } = queryParams;

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;
    const where = await buildWhereClause({ filterField, operator, value });
    let users = await prisma.users.findMany({
      skip,
      take: pageSize,
      where,
    });
    users = users.map((user) => ({
      ...user,
      created_time: format(new Date(user.created_time), "MM-dd-yyyy "),
      updated_time: format(new Date(user.updated_time), "MM-dd-yyyy "),
    }));
    //
    if (users.length === 0) {
      return [];
    }
    return users;
  },

  putUsersService: async (UserData) => {
    //
    await validateRefFranchise(UserData.franchies_id);
    //check coi Sửa đúng ID ko

    //check UserID isExist
    await validatedUserId(UserData.id);
    //
    const updateUser = await prisma.users.update({
      where: {
        id: UserData.id,
      },
      data: {
        username: UserData.username,
        franchies_id: UserData.franchies_id,
        role_id: UserData.role_id,
        password: UserData.password,
        updated_by: UserData.updated_by,
        status: UserData.status,
      },
    });
    return updateUser;
  },
  deleteUsersService: async (id, userId) => {
    //parseString to Int ID
    const Id = parseInt(id);

    //check UsersId isExist
    //
    await validatedUserId(Id);
    const Users = await prisma.users.findUnique({
      where: {
        id: Id,
      },
      select: {
        status: true,
      },
    });

    const updateUsers = await prisma.users.update({
      where: {
        id: Id,
      },
      data: {
        updated_by: userId,
        status: !Users.status,
      },
    });
    return updateUsers;
  },

  //   deleteProductService: async (UserData) => {
  //     const existingProduct = await prisma.Users.findUnique({
  //       where: {
  //         id: UserData.id,
  //       },
  //     });

  //     // Nếu không tìm thấy sản phẩm, ném ra lỗi
  //     if (!existingProduct) {
  //       throw new BadRequestError("Ko tìm thấy ID Sản Phẩm cần xóa");
  //     }

  //     // Nếu sản phẩm tồn tại, thực hiện soft delete bằng cách cập nhật trạng thái thành false
  //     const updateUser= await prisma.Users.update({
  //       where: {
  //         id: UserData.id,
  //       },
  //       data: {
  //         status: false,
  //       },
  //     });
  //     return updatedProduct;
  //   },
};
