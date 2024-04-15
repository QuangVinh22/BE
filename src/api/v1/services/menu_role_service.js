const { PrismaClient } = require("@prisma/client");
const {
  validateCreatedBy,
  validateRefRolePermission,
  validatedUpdatedBy,
  validateRefMenuRole,
} = require("../../middleware/validate/validateReferencer");
const { buildWhereClause } = require("../../utils/searchUtils");
const { format } = require("date-fns");
const prisma = new PrismaClient();
module.exports = {
  getMenuRoleService: async (queryParams) => {
    const { filterField, operator, value, page, limit } = queryParams;

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;
    const where = await buildWhereClause({ filterField, operator, value });

    let Menu_Role = await prisma.menu_role.findMany({
      skip: skip,
      take: pageSize,
      where,
    });
    Menu_Role = Menu_Role.map((menu_role) => ({
      ...menu_role,
      created_time: format(new Date(menu_role.created_time), "MM-dd-yyyy "),
      updated_time: format(new Date(menu_role.updated_time), "MM-dd-yyyy "),
    }));
    //
    if (Menu_Role.length === 0) {
      return [];
    }
    return Menu_Role;
  },
  createMenuRolesService: async (MenuRole, userId) => {
    //check coi MenuRole này được tạo bởi user có tồn tại k

    //Check Role Permission tham chiếu tới có tồn tại k
    await validateRefRolePermission(MenuRole.role_permissions_id);
    const newMenuRole = await prisma.menu_role.create({
      data: {
        role_permissions_id: MenuRole.role_permissions_id,
        function_url: MenuRole.function_url,
        function_name: MenuRole.function_name,
        created_by: userId,
        status: MenuRole.status,
      },
    });
    return newMenuRole;
  },
  putMenuRoleService: async (MenuRoleData, userId) => {
    //Check Role Permission tham chiếu tới có tồn tại k
    await validateRefRolePermission(MenuRoleData.role_permissions_id);
    //Check MenuRole cần sửa có tồn tại hay k
    await validateRefMenuRole(MenuRoleData.id);
    const updateMenuRole = await prisma.menu_role.update({
      where: {
        id: MenuRoleData.id,
      },
      data: {
        role_permissions_id: MenuRoleData.role_permissions_id,
        function_url: MenuRoleData.function_url,
        function_name: MenuRoleData.function_name,
        updated_by: userId,
      },
    });
    return updateMenuRole;
  },
  deleteMenuRoleService: async (id, userId) => {
    //parseString to Int ID
    const Id = parseInt(id);

    //check MenuRoleId isExist
    await validateRefMenuRole(Id);
    //
    const MenuRole = await prisma.menu_role.findUnique({
      where: {
        id: Id,
      },
      select: {
        status: true,
      },
    });

    const updateMenuRole = await prisma.menu_role.update({
      where: {
        id: Id,
      },
      data: {
        updated_by: userId,
        status: !MenuRole.status,
      },
    });
    return updateMenuRole;
  },
};
