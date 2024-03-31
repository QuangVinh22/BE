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
module.exports = {
  getCatalogueService: async (queryParams) => {
    const { id, page, limit } = queryParams;

    // Kiểm tra xem có truyền ID cụ thể không
    if (id) {
      // Fetch Catalogue by ID
      const holderCatalogue = await prisma.catalogue.findUnique({
        where: { id: parseInt(id), status: true },
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
      where: {
        status: true,
      },
    });

    return Catalogue;
  },
  createCataloguesService: async (Catalogue) => {
    //check CreatedBy isExist
    await validateCreatedBy(Catalogue.created_by);
    //
    const newCatalogue = await prisma.catalogue.create({
      data: {
        description: Catalogue.description,
        image: Catalogue.image,
        created_by: Catalogue.created_by,
        status: Catalogue.status,
      },
    });
    return newCatalogue;
  },
  putCatalogueService: async (CatalogueData) => {
    //check UpdateBy isExist
    await validatedUpdatedBy(CatalogueData.updated_by);
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
        updated_by: CatalogueData.updated_by,
        status: CatalogueData.status,
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
