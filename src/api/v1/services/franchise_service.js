const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
module.exports = {
  getFranchiseService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch Franchise by ID
      const holderFranchise = await prisma.franchise.findUnique({
        where: { id: parseInt(id), status: true },
      });
      if (!holderFranchise)
        throw new BadRequestError("Id Franchise  không tồn tại");
      return [holderFranchise]; // Trả về sản phẩm trong một mảng hoặc mảng rỗng nếu không tìm thấy
    }

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;

    const Franchise = await prisma.franchise.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
    });

    return Franchise;
  },
  createFranchisesService: async (Franchise) => {
    //check coi Franchise này được tạo bởi user nào

    console.log(Franchise);
    const newFranchise = await prisma.franchise.create({
      data: {
        user_id: Franchise.user_id,
        floor_id: Franchise.floor_id,
        name: Franchise.name,
        address: Franchise.address,
        phone_number: Franchise.phone_number,
        created_by: Franchise.created_by,
        status: Franchise.status,
      },
    });
    return newFranchise;
  },
  putFranchiseService: async (FranchiseData) => {
    const holderUpdatedBy = await prisma.users.findUnique({
      where: {
        id: FranchiseData.updated_by,
      },
    });

    if (!holderUpdatedBy) {
      throw new NotFoundError("Ko tìm thấy sửa bởi User nào");
    }
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
        updated_by: FranchiseData.updated_by,
        status: FranchiseData.status,
      },
    });
    if (!updateFranchise)
      throw new NotFoundError("Ko tìm thấy ID Franchise cần sửa");
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
