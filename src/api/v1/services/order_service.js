const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
const {
  validateRefOrder,
  validateRefFranchise,
  validateRefFloor,
  validateRefTable,
  validateRefPaymentMethod,
  validatedUpdatedBy,
  validateCreatedBy,
  validateRefOrderDetails,
} = require("../../middleware/validate/validateReferencer");
module.exports = {
  getOrderService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch Order by ID
      const holderOrder = await prisma.orders.findUnique({
        where: { id: parseInt(id) },
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
  createOrdersService: async (Order, userId) => {
    //check id chi nhánh
    await validateRefFranchise(Order.franchise_id);
    //check id floor
    await validateRefFloor(Order.floor_id);
    //check id table
    await validateRefTable(Order.table_id);
    //check payment method id
    await validateRefPaymentMethod(Order.payment_method_id);
    //check createdby

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
        created_by: userId,
        status: Order.status,
      },
    });
    return newOrder;
  },
  putOrderService: async (OrderData, userId) => {
    //check id order cần sửa có tồn tại k
    await validateRefOrder(OrderData.id);
    //check id chi nhánh
    await validateRefFranchise(OrderData.franchise_id);
    //check id floor
    await validateRefFloor(OrderData.floor_id);
    //check id table
    await validateRefTable(OrderData.table_id);
    //check payment method id
    await validateRefPaymentMethod(OrderData.payment_method_id);
    //check update by

    //Vat cost bằng tiền ban đầu + thuế
    const vatAmount = OrderData.price * (OrderData.vat / 100);
    const cost = OrderData.price + vatAmount;
    //Total After DisCount = tiền sau thuế trừ đi giảm giá
    const totalAfterDiscount = cost - cost * (OrderData.discount / 100);

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
        updated_by: userId,
        status: OrderData.status,
      },
    });

    return updateOrder;
  },
  deleteOrderService: async (id, userId) => {
    //parseString to Int ID
    const Id = parseInt(id);

    //check FranchiseId isExist
    await validateRefOrder(Id);
    //
    const Orders = await prisma.orders.findUnique({
      where: {
        id: Id,
      },
      select: {
        status: true,
      },
    });

    const updateOrder = await prisma.orders.update({
      where: {
        id: Id,
      },
      data: {
        updated_by: userId,
        status: !Orders.status,
      },
    });
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
