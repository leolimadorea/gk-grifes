import { gerarKeyKeyAuth } from "@/app/server/db/keyauth/keyauth";
import { prisma } from "@/app/server/db/prisma";
import { PaymentStatus, Type } from "@prisma/client";
import axios from "axios";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";

export async function POST(req) {
  const pusher = new Pusher({
    appId: "1874525",
    key: "50eb5d0aba00fe70f0e5",
    secret: "3adc1732bf048e87e29d",
    cluster: "us2",
    useTLS: true,
  });

  const secret =
    "4bb2c392ff1536207b0a1208046007fd32249d74b94d63544f2d786cd1dba231";

  try {
    const signatureHeader = req.headers.get("x-signature");
    const requestId = req.headers.get("x-request-id");

    if (!signatureHeader || !requestId) {
      return NextResponse.json(
        { error: "Missing x-signature or x-request-id headers" },
        { status: 400 }
      );
    }

    const [tsPart, signaturePart] = signatureHeader.split(",");

    const ts = tsPart.split("=")[1];
    const signature = signaturePart.split("=")[1];

    const payload = await req.json();

    if (
      !payload ||
      !payload.data ||
      !payload.type ||
      payload.type !== "payment"
    ) {
      return NextResponse.json(
        { error: "Invalid payload or event type" },
        { status: 400 }
      );
    }

    const paymentData = payload.data;

    const signatureTemplate = `id:${paymentData.id};request-id:${requestId};ts:${ts}`;

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(signatureTemplate)
      .digest("hex");

    const paymentId = paymentData.id;

    console.log(paymentId, "ID DO PAGAMENTO");
    let paymentInfo;
    try {
      const mpResponse = await axios.get(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer APP_USR-5508268551429017-100117-b9bdef654caecc3a475843a66b1b6901-773708748`,
          },
        }
      );
      paymentInfo = mpResponse.data;
    } catch (error) {
      console.error(
        "Error fetching payment info from MercadoPago:",
        error.response?.data || error.message
      );
      return NextResponse.json(
        { error: "Failed to fetch payment data from MercadoPago." },
        { status: 404 }
      );
    }
    if (paymentInfo.status === "approved") {
      try {
        const paymentWithProductAndCategory = await prisma.payment.findUnique({
          where: {
            gatewayId: paymentId.toString(), // Busca pelo `gatewayId` do pagamento
          },
          include: {
            product: {
              include: {
                category: true, // Inclui a categoria relacionada ao produto
              },
            },
          },
        });

        if (!paymentWithProductAndCategory) {
          throw new Error("Pagamento não encontrado.");
        }

        const produto = paymentWithProductAndCategory.product;
        const categoria = produto.category;

        console.log("Produto:", produto);
        console.log("Categoria:", categoria);

        console.log(`Triggering Pusher event for payment ID: ${paymentId}`);
        await pusher.trigger(
          `payment-channel-${paymentId}`,
          "payment-approved",
          {
            paymentId: paymentData.id,
            message: "Pagamento aprovado!",
          }
        );
      } catch (error) {
        console.error(
          "Erro ao buscar produto e categoria ou ao atualizar o pagamento:",
          error
        );
        return NextResponse.json(
          { error: "Erro ao processar o pagamento." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
