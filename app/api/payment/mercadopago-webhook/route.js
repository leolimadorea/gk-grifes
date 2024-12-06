import { prisma } from "@/app/db/prisma";
import { PaymentStatus } from "@prisma/client";
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
            Authorization: process.env.MERCADO_PAGO_ACCESS_TOKEN,
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
        await prisma.payment.update({
          where: {
            gatewayId: paymentId.toString(),
          },
          data: {
            status: PaymentStatus.APPROVED,
          },
        });
        const paymentWithProductAndCategory = await prisma.payment.findUnique({
          where: {
            gatewayId: paymentId.toString(),
          },
          include: {
            paymentProducts: {
              include: {
                product: true,
              },
            },
            paymentDeliveryAddress: true,
          },
        });
        await Promise.all(
          paymentWithProductAndCategory.paymentProducts.map(
            async (paymentProduct) => {
              await prisma.paymentProduct.update({
                where: {
                  id: paymentProduct.id,
                },
                data: {
                  approved: true,
                },
              });

              await prisma.product.update({
                where: { id: paymentProduct.productId },
                data: {
                  quantity: {
                    decrement: paymentProduct.quantity,
                  },
                },
              });

              return paymentProduct;
            }
          )
        );
        if (!paymentWithProductAndCategory) {
          throw new Error("Pagamento não encontrado.");
        }

        const deliveryAddress =
          paymentWithProductAndCategory.paymentDeliveryAddress[0];
        if (!deliveryAddress) {
          throw new Error("Dados de entrega não encontrados.");
        }
        const shippingData = {
          service: deliveryAddress.serviceId,
          from: {
            name: "Imuno Pump",
            postal_code: "80420080",
            document: "06223391501",
            phone: "79999847482",
            address: "Rua Emiliano Perneta",
            complement: "805",
            number: "659",
            city: "Curitiba",
            state_abbr: "PR",
          },
          to: {
            name: deliveryAddress.name,
            postal_code: deliveryAddress.zip,
            document: deliveryAddress.cpf,
            phone: deliveryAddress.phone,
            address: deliveryAddress.address,
            complement: deliveryAddress.complement,
            number: deliveryAddress.number,
            city: deliveryAddress.city,
            state_abbr: deliveryAddress.state,
          },
          products: paymentWithProductAndCategory.paymentProducts.map(
            (product) => ({
              name: product.product.title,
              quantity: product.quantity,
              unitary_value: product.product.price,
            })
          ),
          volumes: paymentWithProductAndCategory.paymentProducts.map(() => ({
            height: 11,
            width: 17,
            length: 11,
            weight: 0.3,
          })),
          options: {
            insurance_value:
              paymentWithProductAndCategory.paymentProducts.reduce(
                (total, product) =>
                  total + product.quantity * parseFloat(product.product.price),
                0
              ),
            receipt: false,
            own_hand: false,
            reverse: false,
            non_commercial: true,
          },
        };

        const shippingResponse = await fetch(
          "https://e991-2804-d55-403a-3100-886c-c16a-fe4a-46d3.ngrok-free.app/api/createShipping",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderData: shippingData }),
          }
        );

        const shippingResult = await shippingResponse.json();

        if (!shippingResponse.ok) {
          throw new Error(shippingResult.error || "Erro ao criar frete");
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
