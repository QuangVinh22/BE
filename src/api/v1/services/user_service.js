const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
const {
  validateCreatedBy,
  validateRefFloor,
  validatedUpdatedBy,
  validateRefFranchise,
  validatedUserId,
  validateRefRole,
} = require("../../middleware/validate/validateReferencer");
module.exports = {
  getUsersService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch Users by ID
      const holderUsers = await prisma.users.findUnique({
        where: { id: parseInt(id), status: true },
      });
      if (!holderUsers) throw new NotFoundError("Id User  không tồn tại");
      return [holderUsers];
    }

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;

    const user = await prisma.users.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
    });

    return user;
  },

  putUsersService: async (UserData) => {
    await validatedUpdatedBy(UserData.updated_by);
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
