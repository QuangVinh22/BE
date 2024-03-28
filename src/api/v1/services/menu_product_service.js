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
} = require("../../middleware/validateReferencer");
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
    //Check User Created By phải tồn tại
    await validateCreatedBy(MenuProduct.created_by);
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
        created_by: MenuProduct.created_by,
        status: MenuProduct.status,
      },
    });
    return newProduct;
  },
  putMenuProductService: async (MenuProductData) => {
    //check Menu Product cần sửa có tồn tại k
    await validateRefMenuProduct(MenuProductData.id);
    //check id cần sửa của menu product có tồn tại k
    await validatedUpdatedBy(MenuProductData.updated_by);
    //Check Product tham chiếu trong bảng product có tồn tại k
    await validateRefProduct(MenuProductData.product_id);
    //Check Catalogue
    await validateRefCatalogue(MenuProductData.catalogue_id);
    //
    const holderCatalogue = await prisma.catalogue.findUnique({
      where: {
        id: MenuProductData.catalogue_id,
      },
    });
    if (!holderCatalogue) {
      throw new NotFoundError("Error: CatalogueJD does not exist!");
    }
    //
    const updatedProduct = await prisma.menu_products.update({
      where: {
        id: MenuProductData.id,
      },
      data: {
        name: MenuProductData.name,
        product_id: MenuProductData.product_id,
        catalogue_id: MenuProductData.catalogue_id,
        updated_by: MenuProductData.updated_by,
        status: MenuProductData.status,
      },
    });
    return updatedProduct;
  },
  deleteMenuProductService: async (MenuProductData) => {
    const deleteProduct = await prisma.products.delete({
      where: {
        id: MenuProductData.id,
      },
    });
    return deleteProduct;
  },
};
