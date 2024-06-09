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
} = require("../../middleware/validate/validateReferencer");
const { buildWhereClause } = require("../../utils/searchUtils");
const { format } = require("date-fns");
module.exports = {
  getListFloorIdService: async (queryParams) => {
    const { filterField, operator, value, page, limit } = queryParams;

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;
    const where = await buildWhereClause({ filterField, operator, value });

    let Floors = await prisma.floors.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
      select: {
        id: true,
        floor_name: true,
      },
    });
    // Floors = Floors.map((floor) => {
    //   const formatFloor = {
    //     ...floor,
    //     image: floor.image
    //       ? `http://localhost:8080/images/${floor.image}`
    //       : null,
    //     created_time: format(new Date(floor.created_time), "MM-dd-yyyy "),
    //     updated_time: format(new Date(floor.updated_time), "MM-dd-yyyy "),
    //     created_by: floor.users_floors_created_byTousers.username,
    //     updated_by: floor.users_floors_created_byTousers
    //       ? floor.users_floors_created_byTousers.username
    //       : "Not yet updated",
    //   };
    //   delete formatFloor.users_floors_created_byTousers;
    //   delete formatFloor.users_floors_updated_byTousers;
    //   return formatFloor;
    // });
    //
    if (Floors.length === 0) {
      return [];
    }
    return Floors;
  },
  getFloorService: async (queryParams) => {
    const { filterField, operator, value, page, limit } = queryParams;

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;
    const where = await buildWhereClause({ filterField, operator, value });

    let Floors = await prisma.floors.findMany({
      skip: skip,
      take: pageSize,
      where,
      include: {
        users_floors_created_byTousers: true, // Bao gồm thông tin người dùng đã tạo
        users_floors_updated_byTousers: true,
      },
    });
    Floors = Floors.map((floor) => {
      const formatFloor = {
        ...floor,
        image: floor.image
          ? `http://localhost:8080/images/${floor.image}`
          : null,
        created_time: format(new Date(floor.created_time), "MM-dd-yyyy "),
        updated_time: format(new Date(floor.updated_time), "MM-dd-yyyy "),
        created_by: floor.users_floors_created_byTousers.username,
        updated_by: floor.users_floors_created_byTousers
          ? floor.users_floors_created_byTousers.username
          : "Not yet updated",
      };
      delete formatFloor.users_floors_created_byTousers;
      delete formatFloor.users_floors_updated_byTousers;
      return formatFloor;
    });
    //
    if (Floors.length === 0) {
      return [];
    }
    return Floors;
  },

  createFloorsService: async (Floor, UserId) => {
    //check coi Floor này được tạo bởi user nào
    //Check id chi nhánh muốn thêm có tồn tại k
    await validateRefFranchise(Floor.franchise_id);
    const newFloor = await prisma.floors.create({
      data: {
        franchise_id: Floor.franchise_id,
        floor_number: Floor.floor_number,
        floor_name: Floor.floor_name,
        description: Floor.description,
        created_by: UserId,
        status: Floor.status,
      },
      include: {
        users_floors_created_byTousers: true, // Bao gồm thông tin người dùng đã tạo
      },
    });
    const floorResponse = {
      ...newFloor,
      created_by: newFloor.users_floors_created_byTousers.username, // Thay thế ID bằng username
    };
    delete floorResponse.users_floors_created_byTousers;

    return floorResponse;
  },
  putFloorService: async (FloorData, UserId) => {
    //check chi nhánh
    await validateRefFranchise(FloorData.franchise_id);
    //Check coi lầu muốn sửa có tồn tại k
    await validateRefFloor(FloorData.id);
    const updateFloor = await prisma.floors.update({
      where: {
        id: FloorData.id,
      },
      data: {
        franchise_id: FloorData.franchise_id,
        floor_number: FloorData.Floor_numbers,
        floor_name: FloorData.floor_name,
        description: FloorData.description,
        updated_by: UserId,
      },
      include: {
        users_floors_updated_byTousers: true, // Bao gồm thông tin người dùng đã tạo
      },
    });
    const floorResponse = {
      ...updateFloor,
      updated_by: updateFloor.users_floors_updated_byTousers.username, // Thay thế ID bằng username
    };
    delete floorResponse.users_floors_updated_byTousers;

    return floorResponse;
  },
  //soft deleted
  deleteFloorService: async (id, UserId) => {
    //check UpdateBy isExist
    //phải chuyển sang Int vì params là String
    const Id = parseInt(id);
    //check FloorId isExist
    await validateRefFloor(Id);
    //
    const holderFloor = await prisma.floors.findUnique({
      where: { id: Id },
      //chỉ select status cho nhẹ truy vấn
      select: { status: true },
    });
    const updateFloor = await prisma.floors.update({
      where: {
        id: Id,
      },
      data: {
        updated_by: UserId,
        status: !holderFloor.status,
      },
      include: {
        users_floors_updated_byTousers: true, // Bao gồm thông tin người dùng đã tạo
      },
    });
    const floorResponse = {
      ...updateFloor,
      updated_by: updateFloor.users_floors_updated_byTousers.username, // Thay thế ID bằng username
    };
    delete floorResponse.users_floors_updated_byTousers;

    return floorResponse;
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
