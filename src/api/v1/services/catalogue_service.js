const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
const {
  validateRefCatalogue,
} = require("../../middleware/validate/validateReferencer");
const { buildWhereClause } = require("../../utils/searchUtils");
const { format } = require("date-fns");
module.exports = {
  getCatalogueService: async (queryParams) => {
    const { filterField, operator, value, page, limit } = queryParams;

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;
    const where = await buildWhereClause({ filterField, operator, value });

    let catalogue = await prisma.catalogue.findMany({
      skip: skip,
      take: pageSize,
      where,
      include: {
        users_catalogue_created_byTousers: true, // Bao gồm thông tin người dùng đã tạo
        users_catalogue_updated_byTousers: true,
      },
    });
    catalogue = catalogue.map((cata) => {
      const formarCatalogue = {
        ...cata,
        image: cata.image ? `http://localhost:8080/images/${cata.image}` : null,
        created_time: format(new Date(cata.created_time), "MM-dd-yyyy "),
        updated_time: format(new Date(cata.updated_time), "MM-dd-yyyy "),
        created_by: cata.users_catalogue_created_byTousers.username,
        updated_by: cata.users_catalogue_updated_byTousers
          ? cata.users_catalogue_updated_byTousers.username
          : "Not yet updated",
      };
      delete formarCatalogue.users_catalogue_created_byTousers;
      delete formarCatalogue.users_catalogue_updated_byTousers;
      return formarCatalogue;
    });
    //
    if (catalogue.length === 0) {
      return [];
    }
    return catalogue;
  },
  createCataloguesService: async (Catalogue, imagePath, UserId) => {
    //check CreatedBy isExist
    //imagePath

    const newCatalogue = await prisma.catalogue.create({
      data: {
        description: Catalogue.description,
        image: imagePath,
        created_by: UserId,
        status: true,
      },
    });

    return newCatalogue;
  },
  putCatalogueService: async (CatalogueData, imagePath, UserId) => {
    //check UpdateBy isExist
    //check CatalogueId isExist
    await validateRefCatalogue(parseFloat(CatalogueData.id));
    //
    const updateCatalogue = await prisma.catalogue.update({
      where: {
        id: parseFloat(CatalogueData.id),
      },
      data: {
        description: CatalogueData.description,
        image: imagePath,
        name: CatalogueData.name,
        updated_by: UserId,
      },
    });
    return updateCatalogue;
  },
  deleteCatalogueService: async (id, UserId) => {
    const Id = parseInt(id);
    //check UpdateBy isExist
    // check CatalogueId isExist
    await validateRefCatalogue(Id);
    //tìm catalogue theo ID
    const catalogue = await prisma.catalogue.findUnique({
      where: {
        id: Id,
      },
      select: {
        status: true,
      },
    });
    // Đảo dấu của status (Xóa mềm hoặc khôi phục)
    const updateCatalogue = await prisma.catalogue.update({
      where: {
        id: Id,
      },
      data: {
        updated_by: UserId,
        status: !catalogue.status,
      },
    });
    return updateCatalogue;
  },
  //   deletecatalogueervice: async (CatalogueData) => {
  //     const existingProduct = await prisma.Catalogues.findUnique({
  //       where: {
  //         id: CatalogueData.id,
  //       },
  //     });

  //     // Nếu không tìm thấy sản phẩm, ném ra lỗi
  //     if (!existingProduct) {
  //       throw new BadRequestError("Ko tìm thấy ID Sản Phẩm cần xóa");
  //     }

  //     // Nếu sản phẩm tồn tại, thực hiện soft delete bằng cách cập nhật trạng thái thành false
  //     const updateCatalogue= await prisma.Catalogues.update({
  //       where: {
  //         id: CatalogueData.id,
  //       },
  //       data: {
  //         status: false,
  //       },
  //     });
  //     return updatedProduct;
  //   },
};
