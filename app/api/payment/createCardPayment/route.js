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
    orderData,
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
    if (status === "approved") {
      const dbPayment = await createPayment({
        userId,
        amount: transaction_amount,
        paymentMethod: PaymentMethod.CREDITO,
        gatewayId: id.toString(),
        status:
          status === "approved"
            ? PaymentStatus.APPROVED
            : PaymentStatus.PENDING,
      });
      for (const product of products) {
        await prisma.paymentProduct.create({
          data: {
            paymentId: dbPayment.id,
            productId: product.productId,
            quantity: product.quantity,
            approved: true,
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
      }
      const notaFiscalData = {
        tipo: 1, // Nota Fiscal de Saída
        numero: id.toString(), // Número único da NF
        dataOperacao: new Date().toISOString(), // Data da operação
        contato: {
          nome: orderData.to.name,
          tipoPessoa: "F", // Pessoa Física
          numeroDocumento: orderData.to.document,
          telefone: orderData.to.phone,
          email: payer.email,
          endereco: {
            endereco: orderData.to.address,
            numero: orderData.to.number,
            complemento: orderData.to.complement,
            bairro: orderData.to.neighborhood || "Centro",
            cep: orderData.to.postal_code,
            municipio: orderData.to.city,
            uf: orderData.to.state_abbr,
            pais: "Brasil",
          },
        },
        itens: products.map((product) => ({
          codigo: product.productId.toString(),
          descricao: product.description || "Produto",
          unidade: "UN",
          quantidade: product.quantity,
          valor: product.price,
          tipo: "P", // Produto
        })),
        parcelas: [
          {
            data: new Date().toISOString().split("T")[0],
            valor: transaction_amount,
            formaPagamento: { id: 1 }, // Substitua com o ID de forma de pagamento no Bling
          },
        ],
      };
      try {
        const nfeResponse = await fetch("https://api.bling.com.br/Api/v3/nfe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 8770429d18a79e9954cfc9a01261cb0af6a71b45`, // Substitua pelo seu Access Token do Bling
          },
          body: JSON.stringify(notaFiscalData),
        });

        if (!nfeResponse.ok) {
          // Trata erros de resposta HTTP (ex: 400 ou 500)
          const errorData = await nfeResponse.json();
          throw new Error(
            `Erro na API: ${nfeResponse.status} - ${
              errorData?.message || "Erro desconhecido"
            }`
          );
        }

        const nfeData = await nfeResponse.json();
        console.log("Nota Fiscal criada com sucesso:", nfeData);

        // Log indicando que a nota fiscal foi emitida com sucesso
        console.log(
          `Nota Fiscal emitida com ID: ${nfeData.id || "Desconhecido"}`
        );
      } catch (error) {
        console.error("Erro ao criar a Nota Fiscal:", error.message);
      }

      const shippingResponse = await fetch(
        "http://localhost:3000/api/createShipping",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderData }),
        }
      );

      const shippingResult = await shippingResponse.json();
      if (!shippingResponse.ok) {
        throw new Error(shippingResult.error || "Erro ao criar frete");
      }

      return NextResponse.json({ ...result, shipping: shippingResult });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao processar pagamento:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
