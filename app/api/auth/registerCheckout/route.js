import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || "supersecretkey";
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function POST(req) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json(
      { error: "Todos os campos são obrigatórios." },
      { status: 400 }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "E-mail já está em uso." },
        { status: 400 }
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // Geração do token para redefinição de senha
    const token = jwt.sign({ userId: user.id, email: user.email }, secret, {
      expiresIn: "1h",
    });
    const resetLink = `${appUrl}/resetPassword?token=${token}`;

    // Configuração do e-mail
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Replace with your SMTP provider's settings
      port: 587,
      auth: {
        user: "ddiegerfernandes@gmail.com", // Use environment variables to store sensitive info
        pass: "roir wqhv raqz zubc",
      },
    });
    const mailOptions = {
      from: '"Your App" <no-reply@yourapp.com>',
      to: email,
      subject: "Bem-vindo! Sua conta foi criada com sucesso",
      text: `Olá, ${name}! Sua conta foi criada com sucesso. Para definir sua senha, acesse o link abaixo:\n\n${resetLink}\n\nLembre-se de manter sua senha segura.`,
      html: `<p>Olá, ${name}! SUA SENHA ATUAL É ${password}</p>
             <p>Sua conta foi criada com sucesso. Para definir sua senha, clique no link abaixo:</p>
             <p><a href="${resetLink}">Definir Senha</a></p>
             <p>Lembre-se de manter sua senha segura.</p>`,
    };

    // Envio do e-mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        message: "Usuário registrado com sucesso! Link de redefinição enviado.",
        user,
        password,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao registrar usuário" },
      { status: 500 }
    );
  }
}
