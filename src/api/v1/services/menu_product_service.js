const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
module.exports = {
  getMenuProductsService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch product by ID
      const menuProduct = await prisma.menu_products.findUnique({
        where: { id: parseInt(id), status: true },
      });
      if (!menuProduct)
        throw new NotFoundError("Id Menu Product doest not exist");
      return [menuProduct]; // Trả về sản phẩm trong một mảng hoặc mảng rỗng nếu không tìm thấy
    }

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;

    const menuProducts = await prisma.menu_products.findMany({
      skip: skip,
      take: pageSize,
    });

    return menuProducts;
  },
  createMenuProductsService: async (MenuProduct) => {
    const holderMenuProduct = await prisma.products.findUnique({
      where: {
        id: MenuProduct.product_id,
      },
    });
    if (!holderMenuProduct) {
      throw new NotFoundError("Error: ProductID does not exist!");
    }
    const holderCatalogue = await prisma.catalogue.findUnique({
      where: {
        id: MenuProduct.catalogue_id,
      },
    });
    if (!holderCatalogue) {
      throw new NotFoundError("Error: CatalogueJD does not exist!");
    }
    const newProduct = await prisma.menu_products.create({
      data: {
        name: MenuProduct.name,
        product_id: MenuProduct.product_id,
        catalogue_id: MenuProduct.catalogue_id,
        created_by: MenuProduct.created_by,
        status: MenuProduct.status,
      },
    });
    return newProduct;
  },
  putMenuProductService: async (ProductData) => {
    const updatedProduct = await prisma.menu_products.update({
      where: {
        id: ProductData.id,
      },
      data: {
        name: ProductData.name,
        product_id: ProductData.product_id,
        catalogue_id: ProductData.catalogue_id,
        updated_by: ProductData.updated_by,
        status: ProductData.status,
      },
    });
    if (!updatedProduct)
      throw new NotFoundError("Ko tìm thấy ID Sản Phẩm cần sửa");
    return updatedProduct;
  },
  deleteMenuProductService: async (ProductData) => {
    const deleteProduct = await prisma.products.delete({
      where: {
        id: ProductData.id,
      },
    });
    return deleteProduct;
  },
};
