"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import CartSidebar from "../common/CartSidebar";

const Header13 = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleCart = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className={styles.headerWrapper}>
        <div className={styles.headerContainer}>
          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
          >
            <div className={styles.hamburgerIcon}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* Logo */}
          <div className={styles.logo}>
            <Link href="/">
              <Image
                src="/images/gkgrifes.png"
                alt="GK Grifes"
                width={100}
                height={50}
                priority
              />
            </Link>
          </div>

          {/* Cart Icon for Mobile */}
          <button onClick={toggleCart} className={styles.mobileCartButton}>
            <Image
              src="/images/cart.svg"
              alt="Carrinho"
              width={24}
              height={24}
              className={styles.whiteIcon}
            />
            <span className={styles.cartCount}>0</span>
          </button>

          {/* Desktop Elements */}
          <div className={styles.desktopOnly}>
            {/* Search Bar */}
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

            {/* User Icons */}
            <div className={styles.userIcons}>
              <Link href="/my-account">
                <Image
                  src="/images/user.svg"
                  alt="Minha Conta"
                  width={24}
                  height={24}
                  className={styles.whiteIcon}
                />
              </Link>
              <button onClick={toggleCart} className={styles.cartButton}>
                <Image
                  src="/images/cart.svg"
                  alt="Carrinho"
                  width={24}
                  height={24}
                  className={styles.whiteIcon}
                />
                <span className={styles.cartCount}>0</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className={styles.mobileSearchBar}>
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
      </header>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
      >
        <div className={styles.mobileMenuHeader}>
          <button onClick={toggleMobileMenu} className={styles.closeButton}>
            <div className={styles.closeIcon}>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
        <nav className={styles.mobileNav}>
          <ul>
            <li>
              <Link href="/produtos" onClick={toggleMobileMenu}>
                Produtos
              </Link>
            </li>
            <li>
              <Link href="/vestuario" onClick={toggleMobileMenu}>
                Vestuário
              </Link>
            </li>
            <li>
              <Link href="/acessorios" onClick={toggleMobileMenu}>
                Acessórios
              </Link>
            </li>
            <li>
              <Link href="/calcados" onClick={toggleMobileMenu}>
                Calçados
              </Link>
            </li>
            <li>
              <Link href="/sob-encomenda" onClick={toggleMobileMenu}>
                Sob Encomenda
              </Link>
            </li>
            <li>
              <Link href="/kids" onClick={toggleMobileMenu}>
                Kids
              </Link>
            </li>
            <li>
              <Link href="/comunidade" onClick={toggleMobileMenu}>
                Comunidade
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Desktop Navigation */}
      <nav className={`${styles.navWrapper} ${styles.desktopOnly}`}>
        <div className={styles.navContainer}>
          <ul>
            <li>
              <Link href="/produtos">Produtos</Link>
            </li>
            <li>
              <Link href="/vestuario">Vestuário</Link>
            </li>
            <li>
              <Link href="/acessorios">Acessórios</Link>
            </li>
            <li>
              <Link href="/calcados">Calçados</Link>
            </li>
            <li>
              <Link href="/sob-encomenda">Sob Encomenda</Link>
            </li>
            <li>
              <Link href="/kids">Kids</Link>
            </li>
            <li>
              <Link href="/comunidade">Comunidade</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </>
  );
};

export default Header13;
