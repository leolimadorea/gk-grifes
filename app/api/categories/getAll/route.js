import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        createdAt: true,
      },
    });
    return categories;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw new Error("Erro ao buscar categorias do banco de dados");
  }
}
