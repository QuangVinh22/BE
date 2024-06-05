const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
const {
  validateRefOrder,
  validateRefProduct,
  validateRefOrderDetails,
} = require("../../middleware/validate/validateReferencer");
const { buildWhereClause } = require("../../utils/searchUtils");
const { format } = require("date-fns");
module.exports = {
  getOrderDetailService: async (queryParams) => {
    const { filterField, operator, value, page, limit } = queryParams;

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;
    const where = await buildWhereClause({ filterField, operator, value });

    let Order_Detail = await prisma.orders_detail.findMany({
      skip: skip,
      take: pageSize,
      where,
      include: {
        products: true,
        users_orders_detail_created_byTousers: true,
        users_orders_detail_updated_byTousers: true,
      },
    });
    Order_Detail = Order_Detail.map((o_d) => {
      const formatOrderDetail = {
        ...o_d,
        created_by: o_d.users_orders_detail_created_byTousers.username,
        updated_by: o_d.users_orders_detail_updated_byTousers
          ? o_d.users_orders_detail_updated_byTousers.username
          : "Not Yed Updated",
        created_time: format(new Date(o_d.created_time), "MM-dd-yyyy "),
        updated_time: format(new Date(o_d.updated_time), "MM-dd-yyyy "),
        products: o_d.products.name,
      };
      delete formatOrderDetail.users_orders_detail_created_byTousers;
      delete formatOrderDetail.users_orders_detail_updated_byTousers;
      return formatOrderDetail;
    });
    //
    if (Order_Detail.length === 0) {
      return [];
    }
    return Order_Detail;
  },
  createOrderDetailsService: async (OrderDetail, userId) => {
    //validate OrderId isExist
    await validateRefOrder(OrderDetail.order_id);
    //validate ProductId isExist
    await validateRefProduct(OrderDetail.product_id);
    //validate User Createdby isExist

    //

    const totalPrice = OrderDetail.price_per_unit * OrderDetail.quantity;
    const vatAmount = totalPrice * (OrderDetail.vat / 100);
    const cost = totalPrice + vatAmount;
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
        created_by: userId,
        status: OrderDetail.status,
      },
    });
    return newOrderDetail;
  },
  putOrderDetailService: async (OrderDetailData, userId) => {
    //validate OrderId isExist
    await validateRefOrder(OrderDetailData.order_id);
    //validate ProductId isExist
    await validateRefProduct(OrderDetailData.product_id);
    //validate UpdatedBy isExist
    //
    await validateRefOrderDetails(OrderDetailData.id);
    const totalPrice =
      OrderDetailData.price_per_unit * OrderDetailData.quantity;
    const vatAmount = totalPrice * (OrderDetailData.vat / 100);

    const cost = totalPrice + vatAmount;

    const totalAfterDiscount = cost - cost * (OrderDetailData.discount / 100);

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
        updated_by: userId,
      },
    });

    return updateOrderDetail;
  },
  deleteOrDetailsService: async (id, userId) => {
    //parseString to Int ID
    const Id = parseInt(id);

    //check OrDetailsId isExist
    await validateRefOrderDetails(Id);
    //
    const OrDetails = await prisma.orders_detail.findUnique({
      where: {
        id: Id,
      },
      select: {
        status: true,
      },
    });

    const updateOrDetails = await prisma.orders_detail.update({
      where: {
        id: Id,
      },
      data: {
        updated_by: userId,
        status: !OrDetails.status,
      },
    });
    return updateOrDetails;
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
