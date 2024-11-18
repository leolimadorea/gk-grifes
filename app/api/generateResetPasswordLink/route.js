import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || "supersecretkey";

const transporter = nodemailer.createTransport({
  service: "gmail", // Use o serviço do seu provedor (Ex: Gmail, Outlook)
  auth: {
    user: process.env.EMAIL_USER, // Seu email
    pass: process.env.EMAIL_PASS, // Sua senha ou App Password
  },
});

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "O email é obrigatório." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, secret, {
      expiresIn: "1h",
    });

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/resetPassword?token=${token}`;

    // Enviar o email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Email do remetente
      to: email, // Email do destinatário
      subject: "Redefinição de Senha",
      html: `
        <p>Olá,</p>
        <p>Você solicitou a redefinição de sua senha. Clique no link abaixo para redefinir:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>Este link é válido por 1 hora.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Link de redefinição enviado para o email." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao enviar o link de redefinição:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
