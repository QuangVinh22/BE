const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
const {
  validateRefOrder,
  validateRefTable,
  validateRefQR,
  validateRefFranchise,
  validateRefFloor,
} = require("../../middleware/validate/validateReferencer");
const { generateOrderQR, generateQrOnTable } = require("../../utils/qrUtils");
const { format } = require("date-fns");
const { buildWhereClause } = require("../../utils/searchUtils");
module.exports = {
  getQRService: async (queryParams) => {
    const { filterField, operator, value, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;
    const where = await buildWhereClause({ filterField, operator, value });
    let QR = await prisma.qr.findMany({
      skip: skip,
      take: pageSize,
      where,
    });
    QR = QR.map((q_r) => {
      const formatQR = {
        ...q_r,
        qr_url: q_r.qr_url ? `${q_r.qr_url}` : null,
        created_time: format(new Date(q_r.created_time), "MM-dd-yyyy "),
        updated_time: q_r.updated_by
          ? format(new Date(product.updated_time), "MM-dd-yyyy ")
          : "Not Yet Updated",
      };

      return formatQR;
    });
    return QR;
  },
  createQRsService: async (qrData, userId) => {
    await validateRefOrder(qrData.order_id);
    const holder_orderId = qrData.order_id;
    const filePath = await generateOrderQR(
      `http://localhost:5173/ViewOrder/${holder_orderId}`,
      holder_orderId
    );

    if (!filePath)
      throw new BadRequestError("Có lỗi khi xảy ra vấn đề tạo mã QR");
    const newQr = prisma.qr.create({
      data: {
        qr_url: filePath,
        order_id: qrData.order_id,

        created_by: userId,
        status: qrData.status,
      },
    });

    return newQr;
  },
  createQRsByTableService: async (qrData, userId) => {
    console.log(qrData.table_id);
    console.log(qrData.franchise_id);

    console.log(qrData.floor_id);
    if (qrData.table_id) await validateRefTable(qrData.table_id);
    const holder_tableId = qrData.table_id;
    if (qrData.franchise_id) await validateRefFranchise(qrData.franchise_id);
    const holder_franchiseId = qrData.franchise_id;
    if (qrData.floor_id) await validateRefFloor(qrData.floor_id);
    const holder_floorId = qrData.floor_id;
    const filePath = await generateQrOnTable(
      `http://localhost:5173/${holder_tableId}/${holder_franchiseId}/${holder_floorId}`,
      holder_franchiseId,
      holder_floorId,
      holder_tableId
    );

    if (!filePath)
      throw new BadRequestError("Có lỗi khi xảy ra vấn đề tạo mã QR");
    const newQr = prisma.qr.create({
      data: {
        qr_url: filePath,

        table_id: qrData.table_id,
        created_by: userId,
        status: qrData.status,
      },
    });

    return newQr;
  },
  putQRService: async (QRData, userId) => {
    //checkupdate

    //Order
    await validateRefOrder(QRData.order_id);
    //Check table is exist
    await validateRefTable(QRData.table_id);
    //
    await validateRefQR(QRData.id);
    const updateQR = await prisma.qr.update({
      where: {
        id: QRData.id,
      },
      data: {
        order_id: QRData.order_id,
        table_id: QRData.table_id,
        updated_by: userId,
      },
    });
    return updateQR;
  },
  deleteQRService: async (id, userId) => {
    //parseString to Int ID
    const Id = parseInt(id);

    //check QRId isExist
    await validateRefQR(Id);
    //
    const QR = await prisma.qr.findUnique({
      where: {
        id: Id,
      },
      select: {
        status: true,
      },
    });

    const updateQR = await prisma.qr.update({
      where: {
        id: Id,
      },
      data: {
        updated_by: userId,
        status: !QR.status,
      },
    });
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
