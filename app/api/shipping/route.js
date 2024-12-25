import refreshTokenIfNeeded from "@/app/db/token/getAcessToken";
import axios from "axios";
export async function POST(req) {
  try {
    const { zipCode, products } = await req.json();

    if (!zipCode) {
      return new Response(
        JSON.stringify({ error: "CEP de destino é obrigatório" }),
        { status: 400 }
      );
    }
    const tokenData = await refreshTokenIfNeeded();

    const options = {
      method: "POST",
      url: "https://melhorenvio.com.br/api/v2/me/shipment/calculate",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData}`,
        "User-Agent": `${process.env.MELHOR_ENVIO_USER_AGENT}`,
      },
      data: {
        from: { postal_code: `${process.env.FROM_POSTAL_CODE}` },
        to: { postal_code: zipCode },
        products,
      },
    };

    const response = await axios.request(options);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error(
      "Erro ao calcular o frete:",
      error.response?.data || error.message
    );
    return new Response(JSON.stringify({ error: "Erro ao calcular o frete" }), {
      status: 500,
    });
  }
}
