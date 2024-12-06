import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;

  console.log("ID da categoria:", id);

  try {
    if (!id) {
      return NextResponse.json(
        { error: "ID da categoria não foi fornecido" },
        { status: 400 }
      );
    }

    const products = await prisma.product.findMany({
      where: {
        categoryId: parseInt(id, 10),
      },
      select: {
        id: true,
        title: true,
        img: true,
        price: true,
        description: true,
        status: true,
        quantity: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    console.log("Produtos da categoria:", products);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos da categoria:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos da categoria" },
      { status: 500 }
    );
  }
}
