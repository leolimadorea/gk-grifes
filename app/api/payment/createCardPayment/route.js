import { createPayment } from "@/app/db/payment/createPayment";
import { PaymentMethod, PaymentStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const {
    token,
    transaction_amount,
    installments,
    payment_method_id,
    issuer_id,
    payer,
    userId,
    products,
  } = await req.json();
  if (
    !transaction_amount ||
    !token ||
    !payment_method_id ||
    !payer ||
    !userId ||
    !products ||
    !products.length
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
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
    const { id, status } = result;
    const dbPayment = await createPayment({
      userId,
      amount: transaction_amount,
      paymentMethod: PaymentMethod.CREDITO,
      gatewayId: id.toString(),
      status:
        status === "approved" ? PaymentStatus.APPROVED : PaymentStatus.PENDING,
    });
    for (const product of products) {
      await prisma.paymentProduct.create({
        data: {
          paymentId: dbPayment.id,
          productId: product.productId,
          quantity: product.quantity,
        },
      });

      await prisma.product.update({
        where: { id: product.productId },
        data: {
          quantity: {
            decrement: product.quantity,
          },
        },
      });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao processar pagamento:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
