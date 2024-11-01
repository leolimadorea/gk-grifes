import { NextResponse } from "next/server";

export async function POST(req) {
  const {
    token,
    transaction_amount,
    installments,
    payment_method_id,
    issuer_id,
    payer,
  } = await req.json();

  try {
    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer TEST-3758424019225992-040322-010d86f865bf1f9635ef37103c630a7b-1164572593`, // Substitua pela sua Access Token do Mercado Pago
        "X-Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        token,
        transaction_amount,
        installments,
        payment_method_id,
        issuer_id,
        payer,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Erro ao criar pagamento");
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao processar pagamento:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
