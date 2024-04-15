const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
const {
  validateRefProduct,
} = require("../../middleware/validate/validateReferencer");
const { buildWhereClause } = require("../../utils/searchUtils");
const { format } = require("date-fns");
module.exports = {
  getProductsService: async (queryParams) => {
    const { filterField, operator, value, page, limit } = queryParams;

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;
    const where = await buildWhereClause({ filterField, operator, value });

    let products = await prisma.products.findMany({
      skip: skip,
      take: pageSize,
      where,
    });
    products = products.map((product) => ({
      ...product,
      created_time: format(new Date(product.created_time), "MM-dd-yyyy "),
      updated_time: format(new Date(product.updated_time), "MM-dd-yyyy "),
    }));
    //
    if (products.length === 0) {
      return [];
    }
    return products;
  },
  createProductsService: async (product, userId) => {
    const vatAmount = product.price * (product.vat / 100);
    //tính tiền sau thuế
    const cost = product.price + vatAmount;
    const newProduct = await prisma.products.create({
      data: {
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        vat: product.vat,
        cost: cost,
        created_by: userId,
        status: product.status,
      },
    });
    return newProduct;
  },
  putProductService: async (ProductData, userId) => {
    //check user update có tồn tài k mới cho sửa

    // Check coi product cần update có tồn tại k
    await validateRefProduct(ProductData.id);
    //Tính tiền sau thuế
    const vatAmount = ProductData.price * (ProductData.vat / 100);
    const cost = ProductData.price + vatAmount;

    const updateProduct = await prisma.products.update({
      where: {
        id: ProductData.id,
      },
      data: {
        name: ProductData.name,

        description: ProductData.description,
        image: ProductData.image,
        price: ProductData.price,
        vat: ProductData.vat,
        cost: cost,
        updated_by: userId,
      },
    });
    return updateProduct;
  },
  deleteProductService: async (id, userId) => {
    //parseString to Int ID
    const Id = parseInt(id);

    //check ProductId isExist
    await validateRefProduct(Id);
    //
    const Product = await prisma.products.findUnique({
      where: {
        id: Id,
      },
      select: {
        status: true,
      },
    });

    const updateProduct = await prisma.products.update({
      where: {
        id: Id,
      },
      data: {
        updated_by: userId,
        status: !Product.status,
      },
    });
    return updateProduct;
  },
};
