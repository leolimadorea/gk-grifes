import { createPayment } from "@/app/db/payment/createPayment";
import { prisma } from "@/app/db/prisma";
import { PaymentMethod, PaymentStatus } from "@prisma/client";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextResponse } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export async function POST(req) {
  const {
    transaction_amount,
    description,
    email,
    cpf,
    userId,
    products,
    orderData,
    couponCode,
  } = await req.json();

  if (
    !transaction_amount ||
    !description ||
    !email ||
    !cpf ||
    !userId ||
    !products ||
    !products.length ||
    !orderData
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
        notification_url:
          "https://www.clchamines.com.br/api/payment/mercadopago-webhook",
      },
    });

    const { id, status } = result;

    const dbPayment = await createPayment({
      userId,
      amount: transaction_amount,
      paymentMethod: PaymentMethod.PIX,
      gatewayId: id?.toString() || "",
      status:
        status === "approved" ? PaymentStatus.APPROVED : PaymentStatus.PENDING,
      couponCode: couponCode || undefined,
    });

    for (const product of products) {
      await prisma.paymentProduct.create({
        data: {
          paymentId: dbPayment.id,
          productId: product.productId,
          quantity: product.quantity,
          approved: false,
        },
      });
    }
    await prisma.paymentDeliveryAddress.create({
      data: {
        paymentId: dbPayment.id,
        address: orderData.to.address,
        city: orderData.to.city,
        state: orderData.to.state_abbr,
        country: "Brasil",
        zip: orderData.to.postal_code,
        phone: orderData.to.phone,
        name: orderData.to.name,
        serviceId: orderData.service.toString(),
        complement: orderData.to.complement,
        number: orderData.to.number,
        cpf: orderData.to.document,
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
