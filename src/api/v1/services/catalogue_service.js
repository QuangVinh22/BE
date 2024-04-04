const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
} = require("../../core/error.response");
const {
  validateCreatedBy,
  validatedUpdatedBy,
  validateRefCatalogue,
} = require("../../middleware/validate/validateReferencer");
const { parse } = require("path");
module.exports = {
  getCatalogueService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch Catalogue by ID
      const holderCatalogue = await prisma.catalogue.findUnique({
        where: { id: parseInt(id) },
      });
      if (!holderCatalogue)
        throw new BadRequestError("Id Catalogue  không tồn tại");
      return [holderCatalogue]; // Trả về sản phẩm trong một mảng hoặc mảng rỗng nếu không tìm thấy
    }

    // Fetch all with pagination
    const pageNum = parseInt(page) || 1; // Mặc định là trang 1 nếu không được cung cấp
    const pageSize = parseInt(limit) || 10; // Mặc định 10 sản phẩm mỗi trang nếu không được cung cấp
    const skip = (pageNum - 1) * pageSize;

    const Catalogue = await prisma.catalogue.findMany({
      skip: skip,
      take: pageSize,
      where: {},
    });

    return Catalogue;
  },
  createCataloguesService: async (Catalogue, UserId) => {
    //check CreatedBy isExist
    //
    const newCatalogue = await prisma.catalogue.create({
      data: {
        description: Catalogue.description,
        image: Catalogue.image,
        created_by: UserId,
        status: Catalogue.status,
      },
    });
    return newCatalogue;
  },
  putCatalogueService: async (CatalogueData, UserId) => {
    //check UpdateBy isExist
    //check CatalogueId isExist
    await validateRefCatalogue(CatalogueData.id);
    //
    const updateCatalogue = await prisma.catalogue.update({
      where: {
        id: CatalogueData.id,
      },
      data: {
        description: CatalogueData.description,
        image: CatalogueData.image,
        name: CatalogueData.name,
        updated_by: UserId,
        status: CatalogueData.status,
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
  //   deleteProductService: async (CatalogueData) => {
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
