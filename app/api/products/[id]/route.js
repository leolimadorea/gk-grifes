// api/products/[id]/route.js

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = params;

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
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error("Erro ao buscar o produto:", error);
    return NextResponse.json(
      { error: "Erro ao buscar o produto" },
      { status: 500 }
    );
  }
}
