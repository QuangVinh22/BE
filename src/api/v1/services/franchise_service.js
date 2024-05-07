const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
const {
  validateRefFloor,
  validateRefFranchise,

  validatedUserId,
} = require("../../middleware/validate/validateReferencer");
const { buildWhereClause } = require("../../utils/searchUtils");
const { format } = require("date-fns");
module.exports = {
  getListFranchiseIdService: async (queryParams) => {
    const { filterField, operator, value, page, limit } = queryParams;

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;
    const where = await buildWhereClause({ filterField, operator, value });

    let Franchises = await prisma.franchise.findMany({
      skip: skip,
      take: pageSize,
      where,
      select: {
        id: true,
        name: true,
      },
    });
    // Franchises = Franchises.map((franchise) => {
    //   const formatFranchise = {
    //     ...franchise,

    //     created_time: format(new Date(franchise.created_time), "MM-dd-yyyy "),
    //     updated_time: format(new Date(franchise.updated_time), "MM-dd-yyyy "),
    //     updated_by: franchise.updatedByUser
    //       ? franchise.updatedByUser.username
    //       : "Not Update Yet",
    //     created_by: franchise.createdByUser.username,
    //     user_id: "Tên Quản lý chi nhánh: " + franchise.users.username,
    //   };
    //   delete formatFranchise.createdByUser;
    //   delete formatFranchise.updatedByUser;
    //   delete formatFranchise.users;
    //   delete formatFranchise.floors;
    //   delete formatFranchise._count;
    //   return formatFranchise;
    // });
    //
    if (Franchises.length === 0) {
      return [];
    }
    return Franchises;
  },
  getFranchiseService: async (queryParams) => {
    const { filterField, operator, value, page, limit } = queryParams;

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;
    const where = await buildWhereClause({ filterField, operator, value });

    let Franchises = await prisma.franchise.findMany({
      skip: skip,
      take: pageSize,
      where,
      include: {
        updatedByUser: true, // Bao gồm thông tin người dùng đã tạo
        createdByUser: true,
        users: true,
        _count: {
          select: { floors: true }, // Đếm số lượng tầng
        },
      },
    });
    Franchises = Franchises.map((franchise) => {
      const formatFranchise = {
        ...franchise,

        created_time: format(new Date(franchise.created_time), "MM-dd-yyyy "),
        updated_time: format(new Date(franchise.updated_time), "MM-dd-yyyy "),
        updated_by: franchise.updatedByUser
          ? franchise.updatedByUser.username
          : "Not Update Yet",
        created_by: franchise.createdByUser.username,
        user_id: "Tên Quản lý chi nhánh: " + franchise.users.username,
      };
      delete formatFranchise.createdByUser;
      delete formatFranchise.updatedByUser;
      delete formatFranchise.users;
      delete formatFranchise.floors;
      delete formatFranchise._count;
      return formatFranchise;
    });
    //
    if (Franchises.length === 0) {
      return [];
    }
    return Franchises;
  },
  createFranchisesService: async (Franchise, userId) => {
    //Validate quản lý chi nhánh này có hợp lệ k
    await validatedUserId(Franchise.user_id);
    //check floor Tham chieu co dung k
    //

    const newFranchise = await prisma.franchise.create({
      data: {
        user_id: Franchise.user_id,
        name: Franchise.name,
        address: Franchise.address,
        phone_number: Franchise.phone_number,
        created_by: userId,
        status: Franchise.status,
      },
    });
    return newFranchise;
  },
  putFranchiseService: async (FranchiseData, userId) => {
    //check FranchiseId isExist
    await validateRefFranchise(FranchiseData.id);

    //Check quản lý của chi nhánh này
    const holderUserId = await prisma.users.findUnique({
      where: {
        id: FranchiseData.user_id,
      },
    });

    if (!holderUserId) {
      throw new NotFoundError("Ko tìm thấy Id quản lý của chi nhánh cần sửa ");
    }
    //check cap nhat boi ai
    //Update
    const updateFranchise = await prisma.franchise.update({
      where: {
        id: FranchiseData.id,
      },
      data: {
        user_id: FranchiseData.user_id,
        floor_id: FranchiseData.floor_id,
        name: FranchiseData.name,
        address: FranchiseData.address,
        phone_number: FranchiseData.phone_number,
        updated_by: userId,
      },
    });
    return updateFranchise;
  },
  //soft deleted
  deleteFranchiseService: async (id, userId) => {
    //parseString to Int ID
    const Id = parseInt(id);

    //check FranchiseId isExist
    await validateRefFranchise(Id);
    //
    const Franchise = await prisma.franchise.findUnique({
      where: {
        id: Id,
      },
      select: {
        status: true,
      },
    });

    const updateFranchise = await prisma.franchise.update({
      where: {
        id: Id,
      },
      data: {
        updated_by: userId,
        status: !Franchise.status,
      },
    });
    return updateFranchise;
  },
  //   deleteProductService: async (FranchiseData) => {
  //     const existingProduct = await prisma.Franchises.findUnique({
  //       where: {
  //         id: FranchiseData.id,
  //       },
  //     });

  //     // Nếu không tìm thấy sản phẩm, ném ra lỗi
  //     if (!existingProduct) {
  //       throw new BadRequestError("Ko tìm thấy ID Sản Phẩm cần xóa");
  //     }

  //     // Nếu sản phẩm tồn tại, thực hiện soft delete bằng cách cập nhật trạng thái thành false
  //     const updateFranchise= await prisma.Franchises.update({
  //       where: {
  //         id: FranchiseData.id,
  //       },
  //       data: {
  //         status: false,
  //       },
  //     });
  //     return updatedProduct;
  //   },
};
