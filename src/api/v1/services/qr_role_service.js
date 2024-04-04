const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
const {
  validateRefFranchise,
  validateRefRole,
  validateCreatedBy,
  validatedUpdatedBy,
  validateRefQRRole,
} = require("../../middleware/validate/validateReferencer");
module.exports = {
  getQRRoleService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch QRRole by ID
      const holderQRRole = await prisma.qr_role.findUnique({
        where: { id: parseInt(id) },
      });
      if (!holderQRRole) throw new BadRequestError("Id QRRole  không tồn tại");
      return [holderQRRole]; // Trả về sản phẩm trong một mảng hoặc mảng rỗng nếu không tìm thấy
    }

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;

    const QRRole = await prisma.qr_role.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
    });

    return QRRole;
  },
  createQRRolesService: async (QRRole, userId) => {
    //check franchise
    await validateRefFranchise(QRRole.franchise_id);
    //check Role
    await validateRefRole(QRRole.role_id);
    //check createdby

    const newQRRole = await prisma.qr_role.create({
      data: {
        franchise_id: QRRole.franchise_id,
        max_qr_codes: QRRole.max_qr_codes,
        role_id: QRRole.role_id,
        created_by: userId,
        status: QRRole.status,
      },
    });
    return newQRRole;
  },
  putQRRoleService: async (QRRoleData, userId) => {
    const vatAmount = QRRoleData.price * (QRRoleData.vat / 100);
    const cost = QRRoleData.price + vatAmount;
    const totalAfterDiscount = cost - cost * (QRRoleData.discount / 100);
    //updatedby

    //franchise
    await validateRefFranchise(QRRoleData.franchise_id);
    //roleID
    await validateRefRole(QRRoleData.role_id);
    //
    await validateRefQRRole(QRRoleData.id);
    const updateQRRole = await prisma.qr_role.update({
      where: {
        id: QRRoleData.id,
      },
      data: {
        franchise_id: QRRoleData.franchise_id,
        max_qr_codes: QRRoleData.max_qr_codes,
        role_id: QRRoleData.role_id,
        updated_by: userId,
        status: QRRoleData.status,
      },
    });
    return updateQRRole;
  },
  deleteQrRoleService: async (id, userId) => {
    //parseString to Int ID
    const Id = parseInt(id);

    //check FranchiseId isExist
    await validateRefQRRole(Id);
    //
    const QrRole = await prisma.qr_role.findUnique({
      where: {
        id: Id,
      },
      select: {
        status: true,
      },
    });

    const updateQrRole = await prisma.qr_role.update({
      where: {
        id: Id,
      },
      data: {
        updated_by: userId,
        status: !QrRole.status,
      },
    });
    return updateQrRole;
  },
  //   deleteProductService: async (QRRoleData) => {
  //     const existingProduct = await prisma.QRRoles.findUnique({
  //       where: {
  //         id: QRRoleData.id,
  //       },
  //     });

  //     // Nếu không tìm thấy sản phẩm, ném ra lỗi
  //     if (!existingProduct) {
  //       throw new BadRequestError("Ko tìm thấy ID Sản Phẩm cần xóa");
  //     }

  //     // Nếu sản phẩm tồn tại, thực hiện soft delete bằng cách cập nhật trạng thái thành false
  //     const updateQRRole= await prisma.QRRoles.update({
  //       where: {
  //         id: QRRoleData.id,
  //       },
  //       data: {
  //         status: false,
  //       },
  //     });
  //     return updatedProduct;
  //   },
};
