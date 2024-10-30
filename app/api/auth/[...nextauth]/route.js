// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "seu@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Email e senha são obrigatórios.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            payments: true, // Include related data if needed
          },
        });

        if (!user) {
          throw new Error("Nenhum usuário encontrado com este email.");
        }

        const isValid = bcrypt.compareSync(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Senha incorreta.");
        }

        // Exclude the password from the user object
        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // Store user data in the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.user.id,
        name: token.user.name,
        email: token.user.email,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
