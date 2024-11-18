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

    const options = {
      method: "POST",
      url: "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "User-Agent": "TESTANDO (gustavopacosa@gmail.com)",
      },
      data: {
        from: { postal_code: "80420080" },
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
