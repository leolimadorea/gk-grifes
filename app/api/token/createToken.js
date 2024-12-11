import { prisma } from "@/app/db/prisma";

export async function createToken({ token, refreshToken, expiresIn }) {
  console.log(`chamando create token, ${token}, ${refreshToken}, ${expiresIn}`);
  try {
    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getTime() + expiresIn * 1000);

    const createdToken = await prisma.accessToken.create({
      data: {
        token,
        refreshToken,
        expiresAt: expirationDate,
      },
    });

    console.log("Token criado com sucesso:", createdToken);
    return createdToken;
  } catch (error) {
    console.error("Erro ao criar o token no banco de dados:", error);
    throw new Error("Não foi possível criar o token no banco de dados.");
  }
}
