const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
  getMenuRoleService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch MenuRole by ID
      const holderMenuRole = await prisma.menu_role.findUnique({
        where: { id: parseInt(id), status: true },
      });
      if (!holderMenuRole)
        throw new BadRequestError("Id MenuRole  không tồn tại");
      return [holderMenuRole]; // Trả về sản phẩm trong một mảng hoặc mảng rỗng nếu không tìm thấy
    }

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;

    const MenuRole = await prisma.menu_role.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
    });

    return MenuRole;
  },
  createMenuRolesService: async (MenuRole) => {
    //check coi MenuRole này được tạo bởi user nào
    const holderCreatedBy = await prisma.users.findUnique({
      where: {
        id: MenuRole.created_by,
      },
    });
    if (!holderCreatedBy) {
      throw new NotFoundError("Ko tìm thấy tạo bởi User nào");
    }
    const newMenuRole = await prisma.menu_role.create({
      data: {
        role_permissions_id: MenuRole.role_permissions_id,
        function_url: MenuRole.function_url,
        function_name: MenuRole.function_name,
        created_by: MenuRole.created_by,
        status: MenuRole.status,
      },
    });
    return newMenuRole;
  },
  putMenuRoleService: async (MenuRoleData) => {
    const holderUpdatedBy = await prisma.users.findUnique({
      where: {
        id: MenuRoleData.updated_by,
      },
    });

    if (!holderUpdatedBy) {
      throw new NotFoundError("Ko tìm thấy sửa bởi User nào");
    }
    const updateMenuRole = await prisma.menu_role.update({
      where: {
        id: MenuRoleData.id,
      },
      data: {
        role_permissions_id: MenuRoleData.role_permissions_id,
        function_url: MenuRoleData.function_url,
        function_name: MenuRoleData.function_name,
        updated_by: MenuRoleData.updated_by,
        status: MenuRoleData.status,
      },
    });
    if (!updateMenuRole)
      throw new NotFoundError("Ko tìm thấy ID MenuRole cần sửa");
    return updateMenuRole;
  },
};
