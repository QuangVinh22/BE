const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
const {
  validateRefPaymentMethod,
} = require("../../middleware/validate/validateReferencer");
module.exports = {
  getPaymentMethodService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch PaymentMethod by ID
      const holderPaymentMethod = await prisma.payment_method.findUnique({
        where: { id: parseInt(id) },
      });
      if (!holderPaymentMethod)
        throw new BadRequestError("Id PaymentMethod  không tồn tại");
      return [holderPaymentMethod]; // Trả về sản phẩm trong một mảng hoặc mảng rỗng nếu không tìm thấy
    }

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;

    const PaymentMethod = await prisma.payment_method.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
    });

    return PaymentMethod;
  },
  createPaymentMethodsService: async (PaymentMethod, userId) => {
    //check createdby
    const newPaymentMethod = await prisma.payment_method.create({
      data: {
        name: PaymentMethod.name,
        description: PaymentMethod.description,
        created_by: userId,
        status: PaymentMethod.status,
      },
    });
    return newPaymentMethod;
  },
  putPaymentMethodService: async (PaymentMethodData, userId) => {
    //check Updated isExist

    //check paymentmethod isexist
    await validateRefPaymentMethod(PaymentMethodData.id);
    //
    const updatePaymentMethod = await prisma.payment_method.update({
      where: {
        id: PaymentMethodData.id,
      },
      data: {
        name: PaymentMethodData.name,
        description: PaymentMethodData.description,
        updated_by: userId,
      },
    });
    return updatePaymentMethod;
  },
  deletePaymentMethodService: async (id, userId) => {
    //parseString to Int ID
    const Id = parseInt(id);

    //check PaymentMethodId isExist
    await validateRefPaymentMethod(Id);
    //
    const PaymentMethod = await prisma.payment_method.findUnique({
      where: {
        id: Id,
      },
      select: {
        status: true,
      },
    });

    const updatePaymentMethod = await prisma.payment_method.update({
      where: {
        id: Id,
      },
      data: {
        updated_by: userId,
        status: !PaymentMethod.status,
      },
    });
    return updatePaymentMethod;
  },

  //   deleteProductService: async (PaymentMethodData) => {
  //     const existingProduct = await prisma.PaymentMethods.findUnique({
  //       where: {
  //         id: PaymentMethodData.id,
  //       },
  //     });

  //     // Nếu không tìm thấy sản phẩm, ném ra lỗi
  //     if (!existingProduct) {
  //       throw new BadRequestError("Ko tìm thấy ID Sản Phẩm cần xóa");
  //     }

  //     // Nếu sản phẩm tồn tại, thực hiện soft delete bằng cách cập nhật trạng thái thành false
  //     const updatePaymentMethod= await prisma.PaymentMethods.update({
  //       where: {
  //         id: PaymentMethodData.id,
  //       },
  //       data: {
  //         status: false,
  //       },
  //     });
  //     return updatedProduct;
  //   },
};
