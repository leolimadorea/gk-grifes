import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
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
              select: { name: true },
            },
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar produto" }), {
      status: 500,
    });
  }
}
