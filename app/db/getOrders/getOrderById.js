import { prisma } from "../prisma";

export const getOrderById = async (orderId, email) => {
  if (!orderId || !email) {
    throw new Error("Order ID e User ID são obrigatórios.");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return []; // Retorna uma lista vazia se o usuário não existir
    }

    const order = await prisma.payment.findFirst({
      where: {
        id: orderId,
        userId: user.id,
      },
      include: {
        product: true,
        paymentProducts: {
          include: {
            product: true,
          },
        },
        paymentDeliveryAddress: true,
      },
    });

    return order;
  } catch (error) {
    console.error("Erro ao buscar o pedido:", error);
    throw new Error("Erro ao buscar o pedido.");
  }
};
