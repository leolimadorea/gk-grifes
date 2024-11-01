import { prisma } from "@/app/db/prisma";
import axios from "axios";
import crypto from "crypto";
import { NextResponse } from "next/server";
import Pusher from "pusher";

export async function POST(req) {
  const pusher = new Pusher({
    appId: "1889693",
    key: "92ce80a4f49372f48d51",
    secret: "fe87ca04b5d9fe9cab07",
    cluster: "us2",
    useTLS: true,
  });

  const secret =
    "efd2bdde39ec6ccd9cec723082d3d19e4857b6e0ef92696f1a1a6dc65cbd6a79";

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
            Authorization: `Bearer APP_USR-3758424019225992-040322-918b6e811465f67f5255863b5b32e6cd-1164572593`,
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
            gatewayId: paymentId.toString(),
          },
        });

        if (!paymentWithProductAndCategory) {
          throw new Error("Pagamento não encontrado.");
        }

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
