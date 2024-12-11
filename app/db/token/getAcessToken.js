import axios from "axios";
import { prisma } from "../prisma";

async function refreshTokenIfNeeded() {
  const tokenData = await prisma.accessToken.findFirst();

  if (!tokenData) {
    throw new Error("Token não encontrado no banco de dados.");
  }

  const { expiresAt, refreshToken } = tokenData;
  const now = new Date();
  const expirationThreshold = new Date();
  expirationThreshold.setDate(expirationThreshold.getDate() + 2); // 2 dias antes de expirar

  if (expiresAt && expiresAt > now && expiresAt > expirationThreshold) {
    return tokenData.token;
  }

  // Solicitar novo token
  const options = {
    method: "POST",
    url: "https://melhorenvio.com.br/oauth/token",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": `${process.env.MELHOR_ENVIO_USER_AGENT}`,
    },
    data: {
      grant_type: "refresh_token",
      client_id: `${process.env.MELHOR_ENVIO_CLIENT_ID}`,
      client_secret: `${process.env.MELHOR_ENVIO_CLIENT_SECRET}`,
      refresh_token: refreshToken,
    },
  };

  try {
    const response = await axios.request(options);
    const { access_token, refresh_token, expires_in } = response.data;

    const newExpiresAt = new Date();
    newExpiresAt.setSeconds(newExpiresAt.getSeconds() + expires_in);

    await prisma.accessToken.update({
      where: { id: tokenData.id },
      data: {
        token: access_token,
        refreshToken: refresh_token,
        expiresAt: newExpiresAt,
      },
    });

    return access_token;
  } catch (error) {
    console.error(
      "Erro ao renovar o token:",
      error.response?.data || error.message
    );
    throw new Error("Erro ao renovar o token.");
  }
}

export default refreshTokenIfNeeded;
