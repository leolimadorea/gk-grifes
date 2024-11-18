import React from "react";
import Link from "next/link";

export default function Orders({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="my-account-content account-order">
        <p>Você ainda não realizou nenhum pedido.</p>
      </div>
    );
  }

  return (
    <div className="my-account-content account-order">
      <div className="wrap-account-order">
        <table>
          <thead>
            <tr>
              <th className="fw-6">Pedido</th>
              <th className="fw-6">Data</th>
              <th className="fw-6">Status</th>
              <th className="fw-6">Total</th>
              <th className="fw-6">Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              // Calcula o total de itens e preço
              const totalItems = order.paymentProducts.reduce(
                (sum, product) => sum + product.quantity,
                0
              );
              const totalPrice = order.paymentProducts.reduce(
                (sum, product) =>
                  sum + product.quantity * product.product.price,
                0
              );

              return (
                <tr key={order.id} className="tf-order-item">
                  <td>#{order.id}</td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    {order.status === "APPROVED" ? "Aprovado" : order.status}
                  </td>
                  <td>
                    R${totalPrice.toFixed(2)} por {totalItems} item
                    {totalItems > 1 ? "s" : ""}
                  </td>
                  <td>
                    <Link
                      href={`/meus-pedidos-detalhes/${order.id}`}
                      className="tf-btn btn-fill animate-hover-btn rounded-0 justify-content-center"
                    >
                      <span>Ver</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
