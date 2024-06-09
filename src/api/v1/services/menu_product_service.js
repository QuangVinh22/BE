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
const { buildWhereClause } = require("../../utils/searchUtils");
const { format } = require("date-fns");
module.exports = {
  getMenuProductsByCatalogueService: async (queryParams) => {
    const { filterField, operator, value, page, limit } = queryParams;

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;
    const where = await buildWhereClause({ filterField, operator, value });

    let Menu_Products = await prisma.menu_products.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
      select: {
        id: true,
        name: true,
        product_id: true,
        catalogue_id: true,
        status: true,
        products: {
          select: {
            name: true,
            price: true,
          },
        },
        catalogue: {
          select: {
            description: true,
          },
        },
      },
    });
    Menu_Products = Menu_Products.map((menu_product) => {
      const formatMenuProducts = {
        ...menu_product,
        product_id: menu_product.products,
      };
      return formatMenuProducts;
    });
    //
    if (Menu_Products.length === 0) {
      return [];
    }
    return Menu_Products;
  },
  getMenuProductsService: async (queryParams) => {
    const { filterField, operator, value, page, limit } = queryParams;

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;
    const where = await buildWhereClause({ filterField, operator, value });

    let Menu_Products = await prisma.menu_products.findMany({
      skip: skip,
      take: pageSize,
      where,
      include: {
        users_menu_products_created_byTousers: true, // Bao gồm thông tin người dùng đã tạo
        users_menu_products_updated_byTousers: true,
        products: true,
      },
    });
    Menu_Products = Menu_Products.map((menu_product) => {
      const formatMenuProducts = {
        ...menu_product,
        created_time: format(
          new Date(menu_product.created_time),
          "MM-dd-yyyy "
        ),
        updated_time: format(
          new Date(menu_product.updated_time),
          "MM-dd-yyyy "
        ),
        created_by: menu_product.users_menu_products_created_byTousers.username,
        updated_by: menu_product.users_menu_products_updated_byTousers
          ? menu_product.users_menu_products_updated_byTousers.username
          : "Not yet updated",
      };
      delete formatMenuProducts.users_menu_products_created_byTousers;
      delete formatMenuProducts.users_menu_products_updated_byTousers;
      return formatMenuProducts;
    });
    //
    if (Menu_Products.length === 0) {
      return [];
    }
    return Menu_Products;
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
