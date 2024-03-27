const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
} = require("../../core/error.response");
module.exports = {
  getProductsService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch product by ID
      const product = await prisma.products.findUnique({
        where: { id: parseInt(id), status: true },
      });
      if (!product) throw new BadRequestError("Id Product doest không tồn tại");
      return [product]; // Trả về sản phẩm trong một mảng hoặc mảng rỗng nếu không tìm thấy
    }

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;

    const products = await prisma.products.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
    });

    return products;
  },
  createProductsService: async (product) => {
    //  ko cần thiết check trùng
    // const holderProduct = await prisma.products.findUnique({
    //   where: {
    //     name: product.name,
    //     image: product.image,
    //   },
    // });

    // if (holderProduct.length > 0) {
    //   throw new ConflictRequestError("Error: Product already registered!");
    // }
    console.log(product);
    const vatAmount = product.price * (product.vat / 100);
    const cost = product.price + vatAmount;
    const newProduct = await prisma.products.create({
      data: {
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        vat: product.vat,
        cost: cost,
        created_by: product.created_by,
        status: product.status,
      },
    });
    return newProduct;
  },
  putProductService: async (ProductData) => {
    const vatAmount = product.price * (product.vat / 100);
    const cost = product.price + vatAmount;
    const updateProduct = await prisma.products.update({
      where: {
        id: ProductData.id,
      },
      data: {
        name: ProductData.name,
        updated_by: ProductData.updated_by,
        description: ProductData.description,
        image: ProductData.image,
        price: ProductData.price,
        vat: ProductData.vat,
        cost: cost,
        status: ProductData.status,
      },
    });
    if (!updateProduct)
      throw new BadRequestError("Ko tìm thấy ID Sản Phẩm cần sửa");
    return updateProduct;
  },
  deleteProductService: async (ProductData) => {
    const existingProduct = await prisma.products.findUnique({
      where: {
        id: ProductData.id,
      },
    });

    // Nếu không tìm thấy sản phẩm, ném ra lỗi
    if (!existingProduct) {
      throw new BadRequestError("Ko tìm thấy ID Sản Phẩm cần xóa");
    }

    // Nếu sản phẩm tồn tại, thực hiện soft delete bằng cách cập nhật trạng thái thành false
    const updatedProduct = await prisma.products.update({
      where: {
        id: ProductData.id,
      },
      data: {
        status: false,
      },
    });
    return updatedProduct;
  },
};
