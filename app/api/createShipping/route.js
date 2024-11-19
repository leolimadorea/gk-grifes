import axios from "axios";

export async function POST(req) {
  try {
    const { orderData } = await req.json();
    console.log(orderData);
    const options = {
      method: "POST",
      url: "https://sandbox.melhorenvio.com.br/api/v2/me/cart",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "User-Agent": "TESTANDO (gustavopacosa@gmail.com)",
      },
      data: {
        service: orderData.service,
        from: {
          name: orderData.from.name,
          postal_code: orderData.from.postal_code,
          document: orderData.from.document,
          phone: orderData.from.phone,
          address: orderData.from.address,
          complement: orderData.from.complement,
          number: orderData.from.number,
          city: orderData.from.city,
          state_abbr: orderData.from.state_abbr,
        },
        to: {
          name: orderData.to.name,
          postal_code: orderData.to.postal_code,
          document: orderData.to.document,
          phone: orderData.to.phone,
          address: orderData.to.address,
          complement: orderData.to.complement,
          number: orderData.to.number,
          city: orderData.to.city,
          state_abbr: orderData.to.state_abbr,
        },
        products: orderData.products,
        volumes: orderData.volumes,
        options: {
          insurance_value: orderData.options.insurance_value,
          receipt: orderData.options.receipt,
          own_hand: orderData.options.own_hand,
          reverse: orderData.options.reverse,
          non_commercial: orderData.options.non_commercial,
          invoice: orderData.options.invoice,
          platform: "Imuno Pump",
          tags: orderData.options.tags,
        },
      },
    };

    const response = await axios.request(options);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error(
      "Erro ao inserir o frete no carrinho:",
      error.response?.data || error.message
    );
    return new Response(
      JSON.stringify({ error: "Erro ao inserir o frete no carrinho" }),
      { status: 500 }
    );
  }
}
