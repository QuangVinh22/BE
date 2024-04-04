const { PrismaClient } = require("@prisma/client");
const {
  validateCreatedBy,
  validateRefRole,
  validatedUpdatedBy,
  validateRefRolePermission,
} = require("../../middleware/validate/validateReferencer");
const { BadRequestError } = require("../../core/error.response");
const prisma = new PrismaClient();
module.exports = {
  getRolePermissionService: async (queryParams) => {
    const { id, role_id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id && role_id) {
      // Fetch RolePermission by ID
      const holderRolePermission = await prisma.role_permissions.findMany({
        where: { id: parseInt(id), role_id: parseInt(role_id) },
      });
      if (!holderRolePermission)
        throw new BadRequestError(
          "Id RolePermission  không tồn tại, hoặc role_id ko tồn tại"
        );
      return [holderRolePermission]; // Trả về sản phẩm trong một mảng hoặc mảng rỗng nếu không tìm thấy
    }

    if (id) {
      // Fetch RolePermission by ID
      const holderRolePermission = await prisma.role_permissions.findFirst({
        where: { id: parseInt(id) },
      });
      if (!holderRolePermission)
        throw new BadRequestError("Id RolePermission  không tồn tại");
      return [holderRolePermission]; // Trả về sản phẩm trong một mảng hoặc mảng rỗng nếu không tìm thấy
    }
    if (role_id) {
      // Fetch RolePermission by ID
      const holderRolePermission = await prisma.role_permissions.findMany({
        where: { role_id: parseInt(role_id) },
      });
      if (!holderRolePermission)
        throw new BadRequestError("Role_id  không tồn tại");
      return [holderRolePermission]; // Trả về sản phẩm trong một mảng hoặc mảng rỗng nếu không tìm thấy
    }
    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;

    const RolePermission = await prisma.role_permissions.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
    });

    return RolePermission;
  },
  createRolePermissionsService: async (RolePermission, userId) => {
    //check coi RolePermission này được tạo bởi user nào

    //Check Role isvalidate
    await validateRefRole(RolePermission.role_id);
    const newRolePermission = await prisma.role_permissions.create({
      data: {
        role_id: RolePermission.role_id,
        name: RolePermission.name,
        created_by: userId,
        status: RolePermission.status,
      },
    });
    return newRolePermission;
  },
  putRolePermissionService: async (RolePermissionData, userId) => {
    //Check RolePermission isexist
    await validateRefRolePermission(RolePermissionData.id);
    //

    await validateRefRole(RolePermissionData.role_id);

    const updateRolePermission = await prisma.role_permissions.update({
      where: {
        id: RolePermissionData.id,
      },
      data: {
        role_id: RolePermissionData.role_id,
        name: RolePermissionData.name,
        updated_by: userId,
        status: RolePermissionData.status,
      },
    });
    return updateRolePermission;
  },
  deleteRolePermissionService: async (id, userId) => {
    //parseString to Int ID
    const Id = parseInt(id);

    //check RolePermissionId isExist
    await validateRefRolePermission(Id);
    //
    const RolePermission = await prisma.role_permissions.findUnique({
      where: {
        id: Id,
      },
      select: {
        status: true,
      },
    });

    const updateRolePermission = await prisma.role_permissions.update({
      where: {
        id: Id,
      },
      data: {
        updated_by: userId,
        status: !RolePermission.status,
      },
    });
    return updateRolePermission;
  },
};
