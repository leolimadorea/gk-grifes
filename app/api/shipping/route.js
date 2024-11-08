import axios from "axios";

export const POST = async (req) => {
  try {
    const { zipCode } = await req.json();

    const ORIGIN_ZIP_CODE = "81210000";
    const ACCESS_TOKEN = "Wu6g7Fsu6xi0mF9PNCbssTzGE7YysdK84KGqQ0L1";

    const payload = {
      from: { postal_code: ORIGIN_ZIP_CODE },
      to: { postal_code: zipCode },
      products: [
        {
          weight: 0.5, // Peso fixo em kg
          width: 12, // Largura fixa em cm
          height: 2, // Altura fixa em cm
          length: 17, // Comprimento fixo em cm
          insurance_value: 100.0, // Valor do seguro (ajuste conforme necessário)
          quantity: 1, // Quantidade de produtos
        },
      ],
      options: {
        receipt: false,
        own_hand: false,
        collect: false,
      },
    };

    const response = await axios.post(
      "https://api.melhorenvio.com.br/v2/me/shipment/calculate",
      payload,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(
      "Erro ao calcular o frete:",
      error.response?.data || error.message
    );
    return new Response(
      JSON.stringify({
        error: error.response?.data || "Erro interno do servidor",
      }),
      {
        status: error.response?.status || 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
