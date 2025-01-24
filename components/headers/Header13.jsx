"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import CartSidebar from "../common/CartSidebar";

export default function Header13() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header id="header" className={styles["header-default"]}>
      <div className={styles["main-header"]}>
        <div className="container-full px_15 lg-px_40">
          <div className="row wrapper-header align-items-center">
            {/* Barra de pesquisa no layout normal */}
            <div className="col-xl-4 d-flex align-items-center">
              <div className={styles["search-box"]}>
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className={styles["search-input"]}
                />
                <Image
                  src="/images/buscar.svg"
                  alt="Ícone de busca"
                  width={24}
                  height={24}
                  className={styles["search-icon"]}
                />
              </div>
            </div>

            {/* Logo centralizada */}
            <div className="col-xl-4 text-center">
              <Link href="/" className={styles["logo-header"]}>
                <Image
                  alt="logo"
                  className={styles["logo"]}
                  src="/images/gkgrifes.png"
                  width={200}
                  height={35}
                  priority
                />
              </Link>
            </div>

            {/* Media icons à direita */}
            <div className="col-xl-4 d-flex justify-content-end">
              <div className={styles["media-icons"]}>
                <div className="d-flex gap-3">
                  <Link href="/my-account" className="nav-icon-item">
                    <Image
                      src="/images/user.svg"
                      alt="Minha Conta"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <button
                    onClick={toggleCart}
                    className={styles["cart-button"]}
                    aria-label="Abrir carrinho"
                  >
                    <Image
                      src="/images/cart.svg"
                      alt="Carrinho"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </header>
  );
}
