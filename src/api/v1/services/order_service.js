const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
module.exports = {
  getOrderService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch Order by ID
      const holderOrder = await prisma.orders.findUnique({
        where: { id: parseInt(id), status: true },
      });
      if (!holderOrder) throw new BadRequestError("Id Order  không tồn tại");
      return [holderOrder]; // Trả về sản phẩm trong một mảng hoặc mảng rỗng nếu không tìm thấy
    }

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;

    const Order = await prisma.orders.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
    });

    return Order;
  },
  createOrdersService: async (Order) => {
    const vatAmount = Order.price * (Order.vat / 100);
    const cost = Order.price + vatAmount;
    const totalAfterDiscount = cost - cost * (Order.discount / 100);
    const newOrder = await prisma.orders.create({
      data: {
        franchise_id: Order.franchise_id,
        floor_id: Order.floor_id,
        table_id: Order.table_id,
        payment_method_id: Order.payment_method_id,
        price: Order.price,
        vat: Order.vat,
        cost: cost,
        discount: Order.discount,
        total_after_discount: totalAfterDiscount,
        status: Order.status,
      },
    });
    return newOrder;
  },
  putOrderService: async (OrderData) => {
    const vatAmount = OrderData.price * (OrderData.vat / 100);
    const cost = OrderData.price + vatAmount;
    const totalAfterDiscount = cost - cost * (OrderData.discount / 100);
    const holderUpdatedBy = await prisma.users.findUnique({
      where: {
        id: OrderData.updated_by,
      },
    });

    if (!holderUpdatedBy) {
      throw new NotFoundError("Ko tìm thấy sửa bởi User nào");
    }
    const updateOrder = await prisma.orders.update({
      where: {
        id: OrderData.id,
      },
      data: {
        franchise_id: OrderData.franchise_id,
        floor_id: OrderData.floor_id,
        payment_method_id: OrderData.payment_method_id,
        price: OrderData.price,
        vat: OrderData.vat,
        cost: cost,
        discount: OrderData.discount,
        total_after_discount: totalAfterDiscount,
        updated_by: OrderData.updated_by,
        status: OrderData.status,
      },
    });
    if (!updateOrder) throw new NotFoundError("Ko tìm thấy ID Order cần sửa");
    return updateOrder;
  },
  //   deleteProductService: async (OrderData) => {
  //     const existingProduct = await prisma.Orders.findUnique({
  //       where: {
  //         id: OrderData.id,
  //       },
  //     });

  //     // Nếu không tìm thấy sản phẩm, ném ra lỗi
  //     if (!existingProduct) {
  //       throw new BadRequestError("Ko tìm thấy ID Sản Phẩm cần xóa");
  //     }

  //     // Nếu sản phẩm tồn tại, thực hiện soft delete bằng cách cập nhật trạng thái thành false
  //     const updateOrder= await prisma.Orders.update({
  //       where: {
  //         id: OrderData.id,
  //       },
  //       data: {
  //         status: false,
  //       },
  //     });
  //     return updatedProduct;
  //   },
};
