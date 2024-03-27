const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
module.exports = {
  getFloorService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch Floor by ID
      const holderFloor = await prisma.floors.findUnique({
        where: { id: parseInt(id), status: true },
      });
      if (!holderFloor) throw new BadRequestError("Id Floor  không tồn tại");
      return [holderFloor]; // Trả về sản phẩm trong một mảng hoặc mảng rỗng nếu không tìm thấy
    }

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;

    const Floor = await prisma.floors.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
    });

    return Floor;
  },
  createFloorsService: async (Floor) => {
    //check coi Floor này được tạo bởi user nào
    const holderCreatedBy = await prisma.users.findUnique({
      where: {
        id: Floor.created_by,
      },
    });
    if (!holderCreatedBy) {
      throw new NotFoundError("Ko tìm thấy tạo bởi User nào");
    }
    const newFloor = await prisma.floors.create({
      data: {
        franchise_id: Floor.franchise_id,
        floor_number: Floor.Floor_numbers,
        floor_name: Floor.floor_name,
        description: Floor.description,
        created_by: Floor.created_by,
        status: Floor.status,
      },
    });
    return newFloor;
  },
  putFloorService: async (FloorData) => {
    const holderUpdatedBy = await prisma.users.findUnique({
      where: {
        id: FloorData.updated_by,
      },
    });

    if (!holderUpdatedBy) {
      throw new NotFoundError("Ko tìm thấy sửa bởi User nào");
    }
    const updateFloor = await prisma.floors.update({
      where: {
        id: FloorData.id,
      },
      data: {
        franchise_id: FloorData.franchise_id,
        floor_number: FloorData.Floor_numbers,
        floor_name: FloorData.floor_name,
        description: FloorData.description,
        updated_by: FloorData.updated_by,
        status: FloorData.status,
      },
    });
    if (!updateFloor) throw new NotFoundError("Ko tìm thấy ID Floor cần sửa");
    return updateFloor;
  },
  //   deleteProductService: async (FloorData) => {
  //     const existingProduct = await prisma.Floors.findUnique({
  //       where: {
  //         id: FloorData.id,
  //       },
  //     });

  //     // Nếu không tìm thấy sản phẩm, ném ra lỗi
  //     if (!existingProduct) {
  //       throw new BadRequestError("Ko tìm thấy ID Sản Phẩm cần xóa");
  //     }

  //     // Nếu sản phẩm tồn tại, thực hiện soft delete bằng cách cập nhật trạng thái thành false
  //     const updateFloor= await prisma.Floors.update({
  //       where: {
  //         id: FloorData.id,
  //       },
  //       data: {
  //         status: false,
  //       },
  //     });
  //     return updatedProduct;
  //   },
};
