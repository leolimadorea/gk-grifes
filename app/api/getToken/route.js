import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Obter o corpo da requisição
    const body = await request.json();

    // Fazer a solicitação ao endpoint do Melhor Envio
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/oauth/token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": `${process.env.MELHOR_ENVIO_USER_AGENT}`,
        },
        body: JSON.stringify({
          grant_type: body.grant_type,
          client_id: `${process.env.MELHOR_ENVIO_CLIENT_ID}`,
          client_secret: `${process.env.MELHOR_ENVIO_CLIENT_SECRET}`,
          redirect_uri: `${process.env.MELHOR_ENVIO_REDIRECT_URI}`,
          code: body.code,
          refresh_token: body.refresh_token,
        }),
      }
    );

    // Verificar se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro ao obter o token: ${response.status}`);
    }

    const data = await response.json();

    // Retornar o token na resposta
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const config = {
  runtime: "edge", // Otimização opcional para rotas API
};
