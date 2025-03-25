"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import CartSidebar from "../common/CartSidebar";

const Header13 = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleCart = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (e) => {
    if (e.target.classList.contains(styles.overlay)) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={styles.header}>
      {/* Hamburger Button for mobile and desktop */}
      <div className={styles.leftside}>
        <button
          className={styles.menuToggleButton}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <Image
            src="/images/hamburger1.svg"
            alt="Menu"
            width={24}
            height={24}
          />
        </button>

        {/* HUD Overlay Navigation */}
        {isMenuOpen && (
          <div className={styles.overlay} onClick={closeMenu}>
            <div className={styles.nav} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.closeButton}
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close Menu"
              >
                <img
                  src="/images/close-button..png"
                  alt="Close"
                  width={16}
                  height={16}
                />
              </button>

              <ul>
                <li>
                  <Link href="/" className={styles.start}>
                    Início
                  </Link>
                </li>

                <li
                  onClick={() => toggleSubMenu("vestuario")}
                  className={`${styles.dropdown} ${
                    openSubMenu === "vestuario" ? styles.open : ""
                  }`}
                >
                  Vestuário
                  {openSubMenu === "vestuario" && (
                    <ul className={styles.dropdownMenu}>
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
                </li>

                <li
                  onClick={() => toggleSubMenu("calcados")}
                  className={`${styles.dropdown} ${
                    openSubMenu === "calcados" ? styles.open : ""
                  }`}
                >
                  Calçados
                  {openSubMenu === "calcados" && (
                    <ul className={styles.dropdownMenu}>
                      <li>
                        <Link href="/products/tenis">Tênis</Link>
                      </li>
                      <li>
                        <Link href="/products/chinelo">Chinelo</Link>
                      </li>
                    </ul>
                  )}
                </li>

                <li
                  onClick={() => toggleSubMenu("acessorios")}
                  className={`${styles.dropdown} ${
                    openSubMenu === "acessorios" ? styles.open : ""
                  }`}
                >
                  Acessórios
                  {openSubMenu === "acessorios" && (
                    <ul className={styles.dropdownMenu}>
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
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className={styles.logo}>
          <Image
            src="/images/gkgrifes.png"
            alt="GK Grifes"
            width={100}
            height={50}
          />
        </div>
      </div>
      <div className={styles.leftside}>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Buscar" />
          <button>
            <Image
              src="/images/buscar.svg"
              alt="Search"
              width={24}
              height={24}
            />
          </button>
        </div>

        <div className={styles.icons}>
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
            className={styles.cartContainer}
            aria-label="Abrir carrinho"
          >
            <img
              src="/images/cart.svg"
              alt="Carrinho"
              className={styles.cartBadge}
            />
          </button>
        </div>
      </div>
      {isCartOpen && (
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </header>
  );
};

export default Header13;
