"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import CartSidebar from "../common/CartSidebar";

export default function Header13() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleCart = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  return (
    <header id="header" className={styles["header-default"]}>
      <div className={styles.header}>
        <div className="container-full px_15 lg-px_40">
          <div className="row wrapper-header align-items-center">
            {/* Flex container for hamburger, logo, and media icons */}
            <div className="col-xl-12 d-flex justify-content-between align-items-center">
              {/* Hamburger Menu */}
              <button
                className={styles.hamburger}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Abrir menu"
              >
                <Image
                  src="/images/hamburger 1.svg"
                  alt="Menu"
                  width={30}
                  height={30}
                />
              </button>

              {/* Logo */}
              <div className={styles.logoWrapper}>
                <Link href="/" className={styles.logo}>
                  <Image
                    alt="logo"
                    className={styles.logo}
                    src="/images/gkgrifes.png"
                    width={200}
                    height={35}
                    priority
                  />
                </Link>
              </div>

              {/* Media Icons */}
              <div className={styles.mediaicons}>
                <button
                  className={styles.searchtoggle}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  aria-label="Abrir pesquisa"
                ></button>
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
                  className={styles.cart}
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

            {/* Search Bar */}
            <div className={styles.searchboxbottom}>
              <div className={styles.searchbox}>
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className={styles.searchinput}
                />
                <Image
                  src="/images/buscar.svg"
                  alt="Ícone de busca"
                  width={24}
                  height={24}
                  className={styles.searchicon}
                />
              </div>
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div className={styles.mobilesearch}>
            <input
              type="text"
              placeholder="Pesquisar..."
              className={styles.searchinput}
            />
            <button onClick={() => setIsSearchOpen(false)}>X</button>
          </div>
        )}
      </div>

      {isSearchOpen && (
        <div className={styles.mobilesearch}>
          <input
            type="text"
            placeholder="Pesquisar..."
            className={styles.searchinput}
          />
          <button onClick={() => setIsSearchOpen(false)}>X</button>
        </div>
      )}

      <div
        className={`${styles["sidebar-menu"]} ${
          isMenuOpen ? styles["open"] : ""
        }`}
      >
        <button
          className={styles["close-menu"]}
          onClick={() => setIsMenuOpen(false)}
        >
          ✖
        </button>
        <nav>
          <ul>
            <li>
              <Link href="/">Início</Link>
            </li>
            <li>
              <Link href="/shop">Loja</Link>
            </li>
            <li onClick={() => toggleSubMenu("vestuario")}>Vestuário</li>
            {openSubMenu === "vestuario" && (
              <ul>
                <li>
                  <Link href="/products/calca">Calça</Link>
                </li>
                <li>
                  <Link href="/products/bermuda">Bermuda</Link>
                </li>
                <li>
                  <Link href="/products/camisa">Camisa</Link>
                </li>
                <li>
                  <Link href="/products/conjunto">Conjunto</Link>
                </li>
                <li>
                  <Link href="/products/moletom">Moletom</Link>
                </li>
              </ul>
            )}
            <li onClick={() => toggleSubMenu("calcados")}>Calçados</li>
            {openSubMenu === "calcados" && (
              <ul>
                <li>
                  <Link href="/products/tenis">Tênis</Link>
                </li>
                <li>
                  <Link href="/products/chinelo">Chinelo</Link>
                </li>
              </ul>
            )}
            <li onClick={() => toggleSubMenu("acessorios")}>Acessórios</li>
            {openSubMenu === "acessorios" && (
              <ul>
                <li>
                  <Link href="/products/bones">Bonés</Link>
                </li>
                <li>
                  <Link href="/products/cinto">Cinto</Link>
                </li>
                <li>
                  <Link href="/products/bucket-hat">Bucket Hat</Link>
                </li>
                <li>
                  <Link href="/products/oculos">Óculos</Link>
                </li>
              </ul>
            )}
          </ul>
        </nav>
      </div>

      {isCartOpen && (
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </header>
  );
}
