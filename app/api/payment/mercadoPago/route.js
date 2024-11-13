import { createPayment } from "@/app/db/payment/createPayment";
import { PaymentMethod, PaymentStatus } from "@prisma/client";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextResponse } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || "",
});

export async function POST(req) {
  const {
    transaction_amount,
    description,
    email,
    cpf,
    userId,
    products, // Recebendo lista de produtos e quantidades
  } = await req.json();

  if (
    !transaction_amount ||
    !description ||
    !email ||
    !cpf ||
    !userId ||
    !products ||
    !products.length // Verificando se a lista de produtos não está vazia
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const payment = new Payment(client);

  try {
    const result = await payment.create({
      body: {
        transaction_amount,
        description,
        payment_method_id: "pix",
        payer: {
          email,
          identification: {
            type: "CPF",
            number: cpf,
          },
        },
        // notification_url:
        //   "${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payment/mercadopago-webhook",
      },
    });

    const { id, status } = result;

    // Criando o pagamento no banco de dados
    const dbPayment = await createPayment({
      userId,
      amount: transaction_amount,
      paymentMethod: PaymentMethod.PIX,
      gatewayId: id?.toString() || "",
      status:
        status === "approved" ? PaymentStatus.APPROVED : PaymentStatus.PENDING,
    });

    // Associando produtos ao pagamento
    for (const product of products) {
      await prisma.paymentProduct.create({
        data: {
          paymentId: dbPayment.id,
          productId: product.productId,
          quantity: product.quantity,
        },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
