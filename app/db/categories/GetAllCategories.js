import { prisma } from "../prisma";

export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
    });

    return categories;
  } catch (error) {
    console.error("Erro ao buscar categorias", error);
    throw new Error("Erro ao buscar categorias");
  }
};
