const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const {
  BadRequestError,
  ConflictRequestError,
} = require("../../core/error.response");
const {
  SignAccessToken,
  signRefreshToken,
} = require("../services/jwt_service");
module.exports = {
  RegisterCustomerService: async (customer) => {
    const holderCustomer = await prisma.customers.findMany({
      where: {
        contactNumber: customer.contactNumber,
      },
    });
    // Sửa ở đây: kiểm tra nếu mảng holderCustomer không rỗng
    if (holderCustomer.length > 0) {
      throw new ConflictRequestError("Error: Customer already registered!");
    }

    const newCustomer = await prisma.customers.create({
      data: {
        contactNumber: customer.contactNumber,
        name: customer.name,
        status: true,
      },
    });

    return newCustomer;
  },
  LoginCustomerService: async (Customer) => {
    // Giả sử CustomerValidate là một hàm bạn đã định nghĩa để validate thông tin người dùng// Bạn cần cung cấp định nghĩa cho hàm này

    // Tìm người dùng dựa trên email thay vì Customername (tùy thuộc vào schema của bạn)
    const foundCustomer = await prisma.customers.findFirst({
      where: {
        name: Customer.name,
        contactNumber: Customer.contactNumber,
      },
    });

    // Kiểm tra mật khẩu

    // Giả sử bạn có hàm SignAccessToken và signRefreshToken để tạo các token

    return { foundCustomer };
  },
  getCustomerService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch Customer by ID
      const holderCustomer = await prisma.customers.findUnique({
        where: { id: parseInt(id) },
      });
      if (!holderCustomer)
        throw new NotFoundError("Id Customer  không tồn tại");
      return [holderCustomer];
    }

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;

    const customer = await prisma.customers.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
    });

    return customer;
  },
};
