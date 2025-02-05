import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "O código do cupom é obrigatório." },
        { status: 400 }
      );
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code },
    });

    if (!coupon) {
      return NextResponse.json(
        { error: "Cupom não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(coupon);
  } catch (error) {
    console.error("Erro ao buscar cupom:", error);
    return NextResponse.json(
      { error: "Erro ao buscar cupom" },
      { status: 500 }
    );
  }
}
