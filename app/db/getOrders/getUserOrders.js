import { prisma } from "../prisma";

export const getUserOrders = async (email) => {
  if (!email) {
    throw new Error("O email do usuário é obrigatório.");
  }

  try {
    // Localiza o usuário pelo email para obter o userId
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return []; // Retorna uma lista vazia se o usuário não existir
    }

    // Busca os pedidos aprovados relacionados ao userId
    const orders = await prisma.payment.findMany({
      where: {
        userId: user.id, // Usa o ID do usuário
        status: "APPROVED",
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

    return orders;
  } catch (error) {
    console.error("Erro ao buscar os pedidos do usuário:", error);
    throw new Error("Erro ao buscar os pedidos do usuário.");
  }
};
