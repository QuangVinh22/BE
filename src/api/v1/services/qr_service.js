const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
module.exports = {
  getQRService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch QR by ID
      const holderQR = await prisma.qr.findUnique({
        where: { id: parseInt(id), status: true },
      });
      if (!holderQR) throw new BadRequestError("Id QR  không tồn tại");
      return [holderQR]; // Trả về sản phẩm trong một mảng hoặc mảng rỗng nếu không tìm thấy
    }

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;

    const QR = await prisma.qr.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
    });

    return QR;
  },
  createQRsService: async (QR) => {
    const vatAmount = QR.price * (QR.vat / 100);
    const cost = QR.price + vatAmount;
    const totalAfterDiscount = cost - cost * (QR.discount / 100);
    const newQR = await prisma.qr.create({
      data: {
        order_id: QR.order_id,
        table_id: QR.table_id,
        created_by: QR.created_by,
        status: QR.status,
      },
    });
    return newQR;
  },
  putQRService: async (QRData) => {
    const vatAmount = QRData.price * (QRData.vat / 100);
    const cost = QRData.price + vatAmount;
    const totalAfterDiscount = cost - cost * (QRData.discount / 100);
    const holderUpdatedBy = await prisma.users.findUnique({
      where: {
        id: QRData.updated_by,
      },
    });

    if (!holderUpdatedBy) {
      throw new NotFoundError("Ko tìm thấy sửa bởi User nào");
    }
    const updateQR = await prisma.qr.update({
      where: {
        id: QRData.id,
      },
      data: {
        order_id: QRData.order_id,
        table_id: QRData.table_id,
        updated_by: QRData.updated_by,
        status: QRData.status,
      },
    });
    if (!updateQR) throw new NotFoundError("Ko tìm thấy ID QR cần sửa");
    return updateQR;
  },
  //   deleteProductService: async (QRData) => {
  //     const existingProduct = await prisma.QRs.findUnique({
  //       where: {
  //         id: QRData.id,
  //       },
  //     });

  //     // Nếu không tìm thấy sản phẩm, ném ra lỗi
  //     if (!existingProduct) {
  //       throw new BadRequestError("Ko tìm thấy ID Sản Phẩm cần xóa");
  //     }

  //     // Nếu sản phẩm tồn tại, thực hiện soft delete bằng cách cập nhật trạng thái thành false
  //     const updateQR= await prisma.QRs.update({
  //       where: {
  //         id: QRData.id,
  //       },
  //       data: {
  //         status: false,
  //       },
  //     });
  //     return updatedProduct;
  //   },
};
