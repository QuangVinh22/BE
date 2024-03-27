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
  RegisterUserService: async (test) => {
    const holderUser = await prisma.users.findMany({
      where: {
        email: test.email,
      },
    });
    // Sửa ở đây: kiểm tra nếu mảng holderUser không rỗng
    if (holderUser.length > 0) {
      throw new ConflictRequestError("Error: User already registered!");
    }
    const passwordHash = await bcrypt.hash(test.password, 10);
    const newUser = await prisma.users.create({
      data: {
        username: test.username,
        email: test.email,
        password: passwordHash,
        franchies_id: test.franchies_id,
        role_id: test.role_id,
        status: test.status,
        createby: test.createby,
      },
    });

    return newUser;
  },
  LoginUserService: async (user) => {
    // Giả sử userValidate là một hàm bạn đã định nghĩa để validate thông tin người dùng// Bạn cần cung cấp định nghĩa cho hàm này

    // Tìm người dùng dựa trên email thay vì username (tùy thuộc vào schema của bạn)
    const foundUser = await prisma.users.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!foundUser) {
      throw new BadRequestError("User have not registered");
    }

    // Kiểm tra mật khẩu
    const isValid = await bcrypt.compare(user.password, foundUser.password);
    if (!isValid) {
      throw new BadRequestError("Invalid password");
    }

    // Giả sử bạn có hàm SignAccessToken và signRefreshToken để tạo các token
    const accessToken = await SignAccessToken(foundUser.id);
    const refreshToken = await signRefreshToken(foundUser.id);

    return { accessToken, refreshToken };
  },
};
