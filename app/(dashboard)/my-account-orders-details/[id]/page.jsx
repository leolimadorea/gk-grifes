import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import OrderDetails from "@/components/othersPages/dashboard/OrderDetails";
import React from "react";
import { getServerSession } from "next-auth";
import { getOrderById } from "@/app/db/getOrders/getOrderById";

export const metadata = {
  title: "VKLTech",
  description: "VKLTech",
};

export default async function Page({ params }) {
  const { id } = params;

  // Obter a sessão do usuário
  const session = await getServerSession();

  if (!session || !session.user) {
    return (
      <div>
        <h1>Você precisa estar logado para acessar esta página.</h1>
      </div>
    );
  }

  const orderId = parseInt(id, 10);

  // Buscar o pedido pelo ID e ID do usuário
  const order = await getOrderById(orderId, session.user.email);
  console.log(order);
  if (!order) {
    return (
      <div>
        <h1>Pedido não encontrado.</h1>
      </div>
    );
  }

  return (
    <>
      <Header2 />

      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardNav />
            </div>
            <div className="col-lg-9">
              <OrderDetails order={order} />
            </div>
          </div>
        </div>
      </section>

      <Footer2 />
    </>
  );
}
