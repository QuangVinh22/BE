const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  NotFoundError,
  ConflictRequestError,
} = require("../../core/error.response");
const {
  validatedUpdatedBy,
  validateRefRole,
} = require("../../middleware/validate/validateReferencer");
module.exports = {
  getRoleService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch Role by ID
      const holderRole = await prisma.role.findUnique({
        where: { id: parseInt(id) },
      });
      if (!holderRole) throw new NotFoundError("Id Role  không tồn tại");
      return [holderRole]; // Trả về sản phẩm trong một mảng hoặc mảng rỗng nếu không tìm thấy
    }

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;

    const Role = await prisma.role.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
    });

    return Role;
  },
  createRolesService: async (Role, userId) => {
    //check coi Role này được tạo bởi user nào

    const newRole = await prisma.role.create({
      data: {
        name: Role.name,
        description: Role.description,
        created_by: userId,
        status: Role.status,
      },
    });
    return newRole;
  },
  putRoleService: async (RoleData) => {
    //check user update có tồn tài k mới cho sửa
    await validatedUpdatedBy(RoleData.updated_by);
    //check Idrole isexist
    await validateRefRole(RoleData.id);
    const updateRole = await prisma.role.update({
      where: {
        id: RoleData.id,
      },
      data: {
        name: RoleData.name,
        description: RoleData.description,

        updated_by: userId,
        status: RoleData.status,
      },
    });
    return updateRole;
  },
  deleteRoleService: async (id, userId) => {
    //parseString to Int ID
    const Id = parseInt(id);

    //check RoleId isExist
    await validateRefRole(Id);
    //
    const Role = await prisma.role.findUnique({
      where: {
        id: Id,
      },
      select: {
        status: true,
      },
    });

    const updateRole = await prisma.role.update({
      where: {
        id: Id,
      },
      data: {
        updated_by: userId,
        status: !Role.status,
      },
    });
    return updateRole;
  },
};
