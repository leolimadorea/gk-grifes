import { createPayment } from "@/app/db/payment/createPayment";
import { PaymentMethod, PaymentStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("Recebendo requisição de pagamento...");
  try {
    const {
      token,
      transaction_amount,
      installments,
      payment_method_id,
      issuer_id,
      payer,
      userId,
      products,
      orderData,
      couponCode,
    } = await req.json();

    if (
      !transaction_amount ||
      !token ||
      !payment_method_id ||
      !payer ||
      !userId ||
      !products ||
      !products.length ||
      !orderData
    ) {
      console.error("Campos obrigatórios ausentes");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Iniciando chamada para a API do Mercado Pago...");

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer TEST-3758424019225992-040322-010d86f865bf1f9635ef37103c630a7b-1164572593`,
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

    console.log("Resposta da API do Mercado Pago recebida.");

    const result = await response.json();

    console.log("Resultado da chamada ao Mercado Pago:", result);

    if (!response.ok) {
      console.error("Erro na resposta do Mercado Pago:", result);
      throw new Error(result.message || "Erro ao criar pagamento");
    }

    const { id, status } = result;

    console.log("Status do pagamento:", status);

    if (status === "approved") {
      console.log("Pagamento aprovado. Criando registro no banco de dados...");

      const dbPayment = await createPayment({
        userId,
        amount: transaction_amount,
        paymentMethod: PaymentMethod.CREDITO,
        gatewayId: id.toString(),
        status: PaymentStatus.APPROVED,
        couponCode: couponCode || undefined,
      });

      console.log("Pagamento registrado no banco de dados:", dbPayment);

      for (const product of products) {
        console.log("Processando produto:", product);

        await prisma.paymentProduct.create({
          data: {
            paymentId: dbPayment.id,
            productId: product.productId,
            quantity: product.quantity,
            approved: true,
          },
        });

        console.log(`Produto ${product.productId} registrado no pagamento.`);

        await prisma.product.update({
          where: { id: product.productId },
          data: {
            quantity: {
              decrement: product.quantity,
            },
          },
        });

        console.log(
          `Estoque do produto ${product.productId} atualizado no banco de dados.`
        );
      }

      console.log("Registrando endereço de entrega...");

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

      console.log("Endereço de entrega registrado com sucesso.");

      console.log("Criando frete...");

      const shippingResponse = await fetch(
        "http://clchamines.com.br/api/createShipping",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderData }),
        }
      );

      const shippingResult = await shippingResponse.json();

      console.log("Resultado da criação do frete:", shippingResult);

      if (!shippingResponse.ok) {
        console.error("Erro ao criar frete:", shippingResult);
        throw new Error(shippingResult.error || "Erro ao criar frete");
      }

      console.log("Frete criado com sucesso.");

      return NextResponse.json({ ...result, shipping: shippingResult });
    }

    console.warn("Pagamento não aprovado:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao processar pagamento:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
