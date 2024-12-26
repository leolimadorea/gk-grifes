"use client";

import { allHomepages, productsPages } from "@/data/menu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav({ isArrow = false, textColor = "", Linkfs = "" }) {
  const pathname = usePathname();

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const isMenuActive = (menuItem) => {
    let active = false;
    if (menuItem.href?.includes("/")) {
      if (menuItem.href?.split("/")[1] == pathname.split("/")[1]) {
        active = true;
      }
    }
    if (menuItem.length) {
      active = menuItem.some(
        (elm) => elm.href?.split("/")[1] == pathname.split("/")[1]
      );
    }
    if (menuItem.length) {
      menuItem.forEach((item) => {
        item.links?.forEach((elm2) => {
          if (elm2.href?.includes("/")) {
            if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
              active = true;
            }
          }
          if (elm2.length) {
            elm2.forEach((item2) => {
              item2?.links?.forEach((elm3) => {
                if (elm3.href.split("/")[1] == pathname.split("/")[1]) {
                  active = true;
                }
              });
            });
          }
        });
        if (item.href?.includes("/")) {
          if (item.href?.split("/")[1] == pathname.split("/")[1]) {
            active = true;
          }
        }
      });
    }

    return active;
  };
  return (
    <>
      <li className="menu-item position-relative">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor}`}
          style={{
            color: "#CEB177",
            textDecoration: "none",
            fontWeight: "normal",
          }}
        >
          Departamentos
          {isArrow ? <i className="icon icon-arrow-down" /> : ""}
        </a>
        <div className="sub-menu submenu-default">
          <ul className="menu-list">
            {isLoading ? (
              <li>Carregando...</li>
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`/shop-default?category=${category.id}`}
                    className="menu-link-text link"
                    style={{ color: "#333" }}
                  >
                    {category.name}
                  </a>
                </li>
              ))
            ) : (
              <li>Nenhuma categoria encontrada</li>
            )}
          </ul>
        </div>
      </li>
      {/* <li className="menu-item">
        <a
          href="shop-default"
          style={{
            color: "#CEB177",
            textDecoration: "none",
            fontWeight: "normal",
          }}
          className={`item-link ${Linkfs} ${textColor}`}
        >
          Instalações
        </a>
      </li>
      <li className="menu-item">
        <a
          href="/about-us"
          style={{
            color: "#CEB177",
            textDecoration: "none",
            fontWeight: "normal",
          }}
          className={`item-link ${Linkfs} ${textColor}`}
        >
          Sobre
        </a>
      </li>
      <li className="menu-item">
        <a
          href="/contact-1"
          style={{
            color: "#CEB177",
            textDecoration: "none",
            fontWeight: "normal",
          }}
          className={`item-link ${Linkfs} ${textColor}`}
        >
          Contato
        </a>
      </li> */}
    </>
  );
}
