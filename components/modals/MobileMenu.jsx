"use client";
import React from "react";
import Link from "next/link";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";
import { navItems } from "@/data/menu";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const pathname = usePathname();

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
              <a href="#" className="mb-menu-link">
                Produtos
              </a>
              <ul className="sub-menu">
                <li>
                  <a href="/products/camisetas" className="mb-menu-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    Camisetas
                  </a>
                </li>
                <li>
                  <a href="/products/legging" className="mb-menu-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    Legging
                  </a>
                </li>
                <li>
                  <a href="/products/meias" className="mb-menu-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    Meias
                  </a>
                </li>
                <li>
                  <a href="/products/chinelos" className="mb-menu-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    Chinelos
                  </a>
                </li>
              </ul>
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
