"use client";
import React, { useState } from "react";
import Nav from "./Nav";
import Image from "next/image";
import Link from "next/link";
import CartLength from "../common/CartLength";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header18() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const fetchCategories = async () => {
    if (categories.length === 0) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Erro ao buscar categorias");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    setShowDropdown((prev) => !prev);
  };

  const handleCategoryClick = (categoryId) => {
    router.push(`/shop-default?category=${categoryId}`);
  };

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
                  width="24"
                  height="16"
                  viewBox="0 0 24 16"
                  fill="none"
                >
                  <rect width="24" height="3" fill="black" />
                  <rect y="6" width="24" height="3" fill="black" />
                  <rect y="12" width="24" height="3" fill="black" />
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
                    <Link
                      href="/my-account-orders"
                      className="nav-icon-item align-items-center gap-10"
                    >
                      <i className="icon icon-account" />
                      <span className="text">Minha Conta</span>
                    </Link>
                  ) : (
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
                <button className="categories-title" onClick={fetchCategories}>
                  Todas As Categorias
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M12 16l-6-6h12l-6 6z" fill="currentColor" />
                  </svg>
                </button>
                {showDropdown && (
                  <div className="categories-dropdown">
                    {loading && <p>Carregando...</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {!loading && categories.length > 0 && (
                      <ul>
                        {categories.map((category) => (
                          <li
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            style={{ cursor: "pointer" }}
                          >
                            {category.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
              <nav className="box-navigation text-center">
                <ul className="box-nav-ul d-flex align-items-center justify-content-center gap-30">
                  <Nav />
                </ul>
              </nav>
            </div>
            <div className="box-right">
              <div className="icon"></div>
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
