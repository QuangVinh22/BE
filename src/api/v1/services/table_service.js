const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
const {
  validateRefFloor,

  validateRefTable,
} = require("../../middleware/validate/validateReferencer");
const { buildWhereClause } = require("../../utils/searchUtils");
const { format } = require("date-fns");
module.exports = {
  getTableService: async (queryParams) => {
    const { filterField, operator, value, page, limit } = queryParams;

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;
    const where = await buildWhereClause({ filterField, operator, value });

    let Table = await prisma.tables.findMany({
      skip: skip,
      take: pageSize,
      where,
    });
    Table = Table.map((table) => ({
      ...table,
      created_time: format(new Date(table.created_time), "MM-dd-yyyy "),
      updated_time: format(new Date(table.updated_time), "MM-dd-yyyy "),
    }));
    //
    if (Table.length === 0) {
      return [];
    }
    return Table;
  },
  createTablesService: async (table, userId) => {
    //check tạo bởi ai

    //check Floor tham chiếu
    await validateRefFloor(table.floor_id);

    const newTable = await prisma.tables.create({
      data: {
        floor_id: table.floor_id,
        table_numbers: table.table_numbers,
        created_by: userId,
        status: table.status,
      },
    });
    return newTable;
  },
  putTableService: async (TableData, userId) => {
    //
    await validateRefFloor(TableData.floor_id);

    //check coi Sửa đúng ID ko

    //check tableID isExist
    await validateRefTable(TableData.id);
    //
    const updateTable = await prisma.tables.update({
      where: {
        id: TableData.id,
      },
      data: {
        name: TableData.name,
        floor_id: TableData.floor_id,
        table_numbers: TableData.table_numbers,
        updated_by: userId,
      },
    });
    return updateTable;
  },
  deleteTableService: async (id, userId) => {
    //parseString to Int ID
    const Id = parseInt(id);

    //check TableId isExist
    await validateRefTable(Id);
    //
    const Table = await prisma.tables.findUnique({
      where: {
        id: Id,
      },
      select: {
        status: true,
      },
    });

    const updateTable = await prisma.tables.update({
      where: {
        id: Id,
      },
      data: {
        updated_by: userId,
        status: !Table.status,
      },
    });
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
