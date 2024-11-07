import { prisma } from "../prisma";

export const createPayment = async (input) => {
  const {
    userId,
    productId,
    productQuantity,
    amount,
    paymentMethod,
    status,
    gatewayId,
  } = input;

  const payment = await prisma.payment.create({
    data: {
      userId,
      productId,
      productQuantity,
      amount,
      paymentMethod,
      status,
      gatewayId,
    },
  });

  return payment;
};
