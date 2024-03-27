const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
module.exports = {
  getOrderDetailService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch OrderDetail by ID
      const holderOrderDetail = await prisma.orders_detail.findUnique({
        where: { id: parseInt(id), status: true },
      });
      if (!holderOrderDetail)
        throw new BadRequestError("Id OrderDetail  không tồn tại");
      return [holderOrderDetail]; // Trả về sản phẩm trong một mảng hoặc mảng rỗng nếu không tìm thấy
    }

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;

    const OrderDetail = await prisma.orders_detail.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
    });

    return OrderDetail;
  },
  createOrderDetailsService: async (OrderDetail) => {
    const vatAmount = OrderDetail.price * (OrderDetail.vat / 100);
    const totalPrice = OrderDetail.price_per_unit * OrderDetail.quantity;
    const cost = OrderDetail.price + vatAmount;
    const totalAfterDiscount = cost - cost * (OrderDetail.discount / 100);
    const newOrderDetail = await prisma.orders_detail.create({
      data: {
        order_id: OrderDetail.order_id,
        product_id: OrderDetail.product_id,
        quantity: OrderDetail.quantity,
        price_per_unit: OrderDetail.price_per_unit,
        total_price: totalPrice,
        price: totalPrice,
        vat: OrderDetail.vat,
        cost: cost,
        discount: OrderDetail.discount,
        total_after_discount: totalAfterDiscount,
        created_by: OrderDetail.created_by,
        status: OrderDetail.status,
      },
    });
    return newOrderDetail;
  },
  putOrderDetailService: async (OrderDetailData) => {
    const totalPrice =
      OrderDetailData.price_per_unit * OrderDetailData.quantity;
    const vatAmount = totalPrice * (OrderDetailData.vat / 100);

    const cost = totalPrice + vatAmount;

    const totalAfterDiscount = cost - cost * (OrderDetailData.discount / 100);
    const holderUpdatedBy = await prisma.users.findUnique({
      where: {
        id: OrderDetailData.updated_by,
      },
    });

    if (!holderUpdatedBy) {
      throw new NotFoundError("Ko tìm thấy sửa bởi User nào");
    }
    const updateOrderDetail = await prisma.orders_detail.update({
      where: {
        id: OrderDetailData.id,
      },
      data: {
        order_id: OrderDetailData.order_id,
        product_id: OrderDetailData.product_id,
        quantity: OrderDetailData.quantity,
        price_per_unit: OrderDetailData.price_per_unit,
        total_price: totalPrice,
        price: totalPrice,
        vat: OrderDetailData.vat,
        cost: cost,
        discount: OrderDetailData.discount,
        total_after_discount: totalAfterDiscount,
        updated_by: OrderDetailData.updated_by,
        status: OrderDetailData.status,
      },
    });
    if (!updateOrderDetail)
      throw new NotFoundError("Ko tìm thấy ID OrderDetail cần sửa");
    return updateOrderDetail;
  },
  //   deleteProductService: async (OrderDetailData) => {
  //     const existingProduct = await prisma.OrderDetails.findUnique({
  //       where: {
  //         id: OrderDetailData.id,
  //       },
  //     });

  //     // Nếu không tìm thấy sản phẩm, ném ra lỗi
  //     if (!existingProduct) {
  //       throw new BadRequestError("Ko tìm thấy ID Sản Phẩm cần xóa");
  //     }

  //     // Nếu sản phẩm tồn tại, thực hiện soft delete bằng cách cập nhật trạng thái thành false
  //     const updateOrderDetail= await prisma.OrderDetails.update({
  //       where: {
  //         id: OrderDetailData.id,
  //       },
  //       data: {
  //         status: false,
  //       },
  //     });
  //     return updatedProduct;
  //   },
};
