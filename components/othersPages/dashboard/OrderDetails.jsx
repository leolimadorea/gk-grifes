"use client";
import React, { useEffect } from "react";
import Image from "next/image";

export default function OrderDetails({ order }) {
  console.log(order);
  useEffect(() => {
    const tabs = () => {
      document.querySelectorAll(".widget-tabs").forEach((widgetTab) => {
        const titles = widgetTab.querySelectorAll(
          ".widget-menu-tab .item-title"
        );

        titles.forEach((title, index) => {
          title.addEventListener("click", () => {
            // Remove active class from all menu items
            titles.forEach((item) => item.classList.remove("active"));
            // Add active class to the clicked item
            title.classList.add("active");

            // Remove active class from all content items
            const contentItems = widgetTab.querySelectorAll(
              ".widget-content-tab > *"
            );
            contentItems.forEach((content) =>
              content.classList.remove("active")
            );

            // Add active class and fade-in effect to the matching content item
            const contentActive = contentItems[index];
            contentActive.classList.add("active");
            contentActive.style.display = "block";
            contentActive.style.opacity = 0;
            setTimeout(() => (contentActive.style.opacity = 1), 0);

            // Hide all siblings' content
            contentItems.forEach((content, idx) => {
              if (idx !== index) {
                content.style.display = "none";
              }
            });
          });
        });
      });
    };

    tabs();

    return () => {
      document
        .querySelectorAll(".widget-menu-tab .item-title")
        .forEach((title) => {
          title.removeEventListener("click", () => {});
        });
    };
  }, []);

  if (!order) {
    return <p>Pedido não encontrado.</p>;
  }

  const totalPrice = order.paymentProducts.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  const orderDate = new Date(order.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="wd-form-order">
      <div className="order-head">
        <figure className="img-product">
          <Image
            alt={order.paymentProducts[0]?.product.title || "Produto"}
            src={order.paymentProducts[0]?.product.img || "/images/default.jpg"}
            width="720"
            height="1005"
          />
        </figure>
        <div className="content">
          <div
            className={`badge ${order.status === "APPROVED" ? "success" : ""}`}
          >
            {order.status === "APPROVED" ? "Aprovado" : "Pendente"}
          </div>
          <h6 className="mt-8 fw-5">Pedido #{order.id}</h6>
        </div>
      </div>
      <div className="tf-grid-layout md-col-2 gap-15">
        <div className="item">
          <div className="text-2 text_black-2">Itens</div>
          <div className="text-2 mt_4 fw-6">
            {order.paymentProducts
              .map((item) => `${item.product.title} (x${item.quantity})`)
              .join(", ")}
          </div>
        </div>
        <div className="item">
          <div className="text-2 text_black-2">Data do Pedido</div>
          <div className="text-2 mt_4 fw-6">{orderDate}</div>
        </div>
        <div className="item">
          <div className="text-2 text_black-2">Endereço</div>
          <div className="text-2 mt_4 fw-6">
            {order.paymentDeliveryAddress[0]?.address || "Não informado"}
          </div>
        </div>
        <div className="item">
          <div className="text-2 text_black-2">Total</div>
          <div className="text-2 mt_4 fw-6">R${totalPrice.toFixed(2)}</div>
        </div>
      </div>
      <div className="widget-tabs style-has-border widget-order-tab">
        <ul className="widget-menu-tab">
          <li className="item-title active">
            <span className="inner">Histórico do Pedido</span>
          </li>
          <li className="item-title">
            <span className="inner">Detalhes do Item</span>
          </li>
          <li className="item-title">
            <span className="inner">Entrega</span>
          </li>
        </ul>
        <div className="widget-content-tab">
          <div className="widget-content-inner active">
            <p>
              Este pedido foi realizado em {orderDate}. O status atual do pedido
              é {order.status === "APPROVED" ? "Aprovado" : "Pendente"}.
            </p>
          </div>
          <div className="widget-content-inner">
            <h4>Itens</h4>
            <ul>
              {order.paymentProducts.map((item) => (
                <li key={item.id}>
                  {item.product.title} - {item.quantity} unidade(s) - R$
                  {(item.quantity * item.product.price).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
          <div className="widget-content-inner">
            <h4>Endereço de Entrega</h4>
            <p>
              {`${order.paymentDeliveryAddress[0]?.address} | ${order.paymentDeliveryAddress[0]?.number} | ${order.paymentDeliveryAddress[0]?.city}` ||
                "Endereço não informado"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
