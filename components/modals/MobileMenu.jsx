"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isMenuActive = (menuItem) => {
    let active = false;
    if (menuItem.href?.includes("/")) {
      if (menuItem.href?.split("/")[1] == pathname.split("/")[1]) {
        active = true;
      }
    }
    if (menuItem.links) {
      menuItem.links?.forEach((elm2) => {
        if (elm2.href?.includes("/")) {
          if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
            active = true;
          }
        }
        if (elm2.links) {
          elm2.links.forEach((elm3) => {
            if (elm3.href.split("/")[1] == pathname.split("/")[1]) {
              active = true;
            }
          });
        }
      });
    }

    return active;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories/getAll");
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span
        className="icon-close icon-close-popup"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
      <div className="mb-canvas-content">
        <div className="mb-body">
          <ul className="nav-ul-mb" id="wrapper-menu-navigation">
            <li className="nav-mb-item">
              <a href="/shop-default" className="mb-menu-link">
                Comprar Agora
              </a>
            </li>
            <li className="nav-mb-item">
              <a href="/shop-default" className="mb-menu-link">
                Instalações
              </a>
            </li>

            <li className="nav-mb-item">
              <a href="#" className="mb-menu-link">
                Departamentos
              </a>
              <ul className="sub-menu">
                {isLoading ? (
                  <li>
                    <a className="mb-menu-link">Carregando...</a>
                  </li>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category.id}>
                      <a
                        href={`/shop-default?category=${category.id}`}
                        className="mb-menu-link"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                        {category.name}
                      </a>
                    </li>
                  ))
                ) : (
                  <li>
                    <a className="mb-menu-link">Nenhuma categoria encontrada</a>
                  </li>
                )}
              </ul>
            </li>
            <li className="nav-mb-item">
              <a href="/about-us" className="mb-menu-link">
                Sobre
              </a>
            </li>
            <li className="nav-mb-item">
              <a href="/contact-1" className="mb-menu-link">
                Contato
              </a>
            </li>
          </ul>
        </div>
        {/* Parte inferior do menu, caso queira reativar */}
        {/* <div className="mb-bottom">
          <Link href={`/login`} className="site-nav-icon">
            <i className="icon icon-account" />
            Login
          </Link>
          <div className="bottom-bar-language">
            <div className="tf-currencies">
              <CurrencySelect />
            </div>
            <div className="tf-languages">
              <LanguageSelect
                parentClassName={
                  "image-select center style-default type-languages"
                }
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
