// app/api/auth/resetPassword/route.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req) {
  try {
    const { token, newPassword } = await req.json();
    console.log("Token recebido:", token);
    console.log("Nova senha recebida:", newPassword);

    if (!token || !newPassword) {
      return NextResponse.json(
        { message: "Token e nova senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Decodificar o token para obter o e-mail
    const decoded = jwt.verify(token, secret);
    const email = decoded.email;

    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Criptografar a nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualizar a senha do usuário no banco de dados
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { message: "Senha redefinida com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao redefinir a senha:", error);
    return NextResponse.json(
      { message: "Erro ao redefinir senha. Token inválido ou expirado" },
      { status: 500 }
    );
  }
}
