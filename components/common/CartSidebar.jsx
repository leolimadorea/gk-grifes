import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CartSidebar.module.scss";

const CartSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose} />

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h3>Seu Carrinho</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <Image
              src="/images/item/cursor-close.svg"
              alt="Fechar"
              width={40}
              height={40}
            />
          </button>
        </div>

        <div className={styles.content}>
          {/* Aqui você pode adicionar os itens do carrinho */}
          <p>Seu carrinho está vazio</p>
        </div>

        <div className={styles.footer}>
          <div className={styles.total}>
            <span>Total:</span>
            <span>R$ 0,00</span>
          </div>
          <Link href="/checkout" className={styles.checkoutButton}>
            Finalizar Compra
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
