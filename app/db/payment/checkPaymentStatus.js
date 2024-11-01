import { prisma } from "../prisma";

export async function checkPaymentStatus(gatewayId) {
  try {
    const payment = await prisma.payment.findUnique({
      where: { gatewayId },
    });

    if (!payment) {
      throw new Error("Payment not found");
    }

    return payment;
  } catch (error) {
    console.error("Error fetching payment status:", error.message);
    throw error;
  }
}
