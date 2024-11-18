import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "E-mail já está em uso." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return new Response(
      JSON.stringify({ message: "Usuário registrado com sucesso!", user }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao registrar usuário" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
