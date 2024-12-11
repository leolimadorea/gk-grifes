import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("Iniciando busca de produtos com variantes...");

    const products = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        img: true,
        price: true,
        category: {
          select: { name: true },
        },
        productVariantValues: {
          select: {
            id: true,
            price: true,
            stock: true,
            variantValue: {
              select: {
                id: true,
                name: true,
                variant: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log("Produtos encontrados:", products.length);
    console.log("Exemplo de produto:", products[0]);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}
