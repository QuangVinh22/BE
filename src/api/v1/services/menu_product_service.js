const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
const {
  validateCreatedBy,
  validateRefProduct,
  validateRefCatalogue,
  validatedUpdatedBy,
  validateRefMenuProduct,
} = require("../../middleware/validate/validateReferencer");
module.exports = {
  getMenuProductsService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch product by ID
      const menuProduct = await prisma.menu_products.findUnique({
        where: { id: parseInt(id) },
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
  createMenuProductsService: async (MenuProduct, userId) => {
    //Check Product tham chiếu trong bảng product có tồn tại k
    await validateRefProduct(MenuProduct.product_id);
    //
    await validateRefCatalogue(MenuProduct.catalogue_id);
    //Truy vấn
    const newProduct = await prisma.menu_products.create({
      data: {
        name: MenuProduct.name,
        product_id: MenuProduct.product_id,
        catalogue_id: MenuProduct.catalogue_id,
        created_by: userId,
        status: MenuProduct.status,
      },
    });
    return newProduct;
  },
  putMenuProductService: async (MenuProductData, userId) => {
    //check Menu Product cần sửa có tồn tại k
    await validateRefMenuProduct(MenuProductData.id);

    //Check Product tham chiếu trong bảng product có tồn tại k
    await validateRefProduct(MenuProductData.product_id);
    //Check Catalogue
    await validateRefCatalogue(MenuProductData.catalogue_id);
    //

    const updatedProduct = await prisma.menu_products.update({
      where: {
        id: MenuProductData.id,
      },
      data: {
        name: MenuProductData.name,
        product_id: MenuProductData.product_id,
        catalogue_id: MenuProductData.catalogue_id,
        updated_by: userId,
        status: MenuProductData.status,
      },
    });
    return updatedProduct;
  },
  deleteMenuProductService: async (id, userId) => {
    //parseString to Int ID
    const Id = parseInt(id);

    //check MenuProductId isExist
    await validateRefMenuProduct(Id);
    //
    const MenuProduct = await prisma.menu_products.findUnique({
      where: {
        id: Id,
      },
      select: {
        status: true,
      },
    });

    const updateMenuProduct = await prisma.menu_products.update({
      where: {
        id: Id,
      },
      data: {
        updated_by: userId,
        status: !MenuProduct.status,
      },
    });
    return updateMenuProduct;
  },
};
