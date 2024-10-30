"use client";
import Nav from "./Nav";
import Image from "next/image";
import Link from "next/link";
import CartLength from "../common/CartLength";
import { products44 } from "@/data/products";
import { useSession } from "next-auth/react";

export default function Header18() {
  const { data: session } = useSession();

  return (
    <header
      id="header"
      className="header-default header-style-2 header-style-4"
    >
      <div className="main-header line">
        <div className="container">
          <div className="row wrapper-header align-items-center">
            <div className="col-md-4 col-3 tf-lg-hidden">
              <a
                href="#mobileMenu"
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasLeft"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={16}
                  viewBox="0 0 24 16"
                  fill="none"
                >
                  {/* SVG do ícone de menu */}
                </svg>
              </a>
            </div>
            <div className="col-md-4 col-6">
              <Link href={`/`} className="logo-header">
                <Image
                  alt="logo"
                  className="logo"
                  src="/images/logo/logo.png"
                  width={137}
                  height={22}
                />
              </Link>
            </div>
            <div className="col-md-4 col-6 tf-md-hidden">
              <div className="tf-form-search">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="search-box"
                >
                  <input type="text" required placeholder="Buscar Produto" />
                  <button className="tf-btn">
                    <i className="icon icon-search" />
                  </button>
                </form>
                {/* Seção de sugestões de busca (comentada) */}
                {/* ... */}
              </div>
            </div>
            <div className="col-md-4 col-3">
              <ul className="nav-icon d-flex justify-content-end align-items-center gap-20">
                <li className="nav-search">
                  <a
                    href="#canvasSearch"
                    data-bs-toggle="offcanvas"
                    aria-controls="offcanvasLeft"
                    className="nav-icon-item"
                  >
                    <i className="icon icon-search" />
                  </a>
                </li>
                <li className="nav-account">
                  {session ? (
                    // Se o usuário estiver logado, mostrar "Minha Conta"
                    <Link
                      href="/my-account"
                      className="nav-icon-item align-items-center gap-10"
                    >
                      <i className="icon icon-account" />
                      <span className="text">Minha Conta</span>
                    </Link>
                  ) : (
                    // Se o usuário não estiver logado, mostrar "Login"
                    <a
                      href="#login"
                      data-bs-toggle="modal"
                      className="nav-icon-item align-items-center gap-10"
                    >
                      <i className="icon icon-account" />
                      <span className="text">Login</span>
                    </a>
                  )}
                </li>
                {/* Outros itens de navegação (comentados) */}
                {/* ... */}
                <li className="nav-cart cart-lg">
                  <a
                    href="#shoppingCart"
                    data-bs-toggle="modal"
                    className="nav-icon-item"
                  >
                    <i className="icon icon-bag" />
                    <span className="count-box">
                      <CartLength />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom line tf-md-hidden">
        <div className="container">
          <div className="wrapper-header d-flex justify-content-between align-items-center">
            <div className="box-left">
              <div className="tf-list-categories">
                <a href="#" className="categories-title">
                  {/* SVG do ícone de categorias */}
                  Todas As Categorias
                </a>
                {/* Menu de categorias (comentado) */}
                {/* ... */}
              </div>
              <nav className="box-navigation text-center">
                <ul className="box-nav-ul d-flex align-items-center justify-content-center gap-30">
                  <Nav />
                  {/* Outros itens de navegação (comentados) */}
                  {/* ... */}
                </ul>
              </nav>
            </div>
            <div className="box-right">
              <div className="icon">{/* SVG do ícone de telefone */}</div>
              <div className="number d-grid">
                <a href="tel:1900100888" className="phone">
                  (11) 94934-3750
                </a>
                <span className="fw-5 text">Cliente Suporte</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
