import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        createdAt: true,
        products: true,
      },
    });
    return categories;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw new Error("Erro ao buscar categorias do banco de dados");
  }
}

// Handler para a rota
export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Erro ao buscar categorias" },
      { status: 500 }
    );
  }
}
