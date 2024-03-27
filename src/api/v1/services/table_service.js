const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
} = require("../../core/error.response");
module.exports = {
  getTableService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch table by ID
      const holderTable = await prisma.tables.findUnique({
        where: { id: parseInt(id), status: true },
      });
      if (!holderTable) throw new BadRequestError("Id Table  không tồn tại");
      return [holderTable]; // Trả về sản phẩm trong một mảng hoặc mảng rỗng nếu không tìm thấy
    }

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;

    const table = await prisma.tables.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
    });

    return table;
  },
  createTablesService: async (table) => {
    const newTable = await prisma.tables.create({
      data: {
        floor_id: table.floor_id,
        table_numbers: table.table_numbers,
        created_by: table.created_by,
        status: table.status,
      },
    });
    return newTable;
  },
  putTableService: async (TableData) => {
    const holderUpdatedBy = await prisma.users.findUnique({
      where: {
        id: TableData.updated_by,
      },
    });
    if (!holderUpdatedBy) {
      throw new BadRequestError("Ko tìm thấy sửa bởi User nào");
    }
    const updateTable = await prisma.tables.update({
      where: {
        id: TableData.id,
      },
      data: {
        name: TableData.name,
        floor_id: TableData.floor_id,
        table_numbers: TableData.table_numbers,
        updated_by: TableData.updated_by,
        status: TableData.status,
      },
    });
    if (!updateTable) throw new BadRequestError("Ko tìm thấy ID Table cần sửa");
    return updateTable;
  },
  //   deleteProductService: async (TableData) => {
  //     const existingProduct = await prisma.tables.findUnique({
  //       where: {
  //         id: TableData.id,
  //       },
  //     });

  //     // Nếu không tìm thấy sản phẩm, ném ra lỗi
  //     if (!existingProduct) {
  //       throw new BadRequestError("Ko tìm thấy ID Sản Phẩm cần xóa");
  //     }

  //     // Nếu sản phẩm tồn tại, thực hiện soft delete bằng cách cập nhật trạng thái thành false
  //     const updateTable= await prisma.tables.update({
  //       where: {
  //         id: TableData.id,
  //       },
  //       data: {
  //         status: false,
  //       },
  //     });
  //     return updatedProduct;
  //   },
};
