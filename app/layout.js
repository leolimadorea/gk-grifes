"use client";

import { useEffect, useState } from "react";
import NextAuthSessionProvider from "./SessionProvider";
import "../public/scss/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import Context from "../context/Context.jsx";

import QuickView from "@/components/modals/QuickView";
import ProductSidebar from "@/components/modals/ProductSidebar";
import QuickAdd from "@/components/modals/QuickAdd";
import Compare from "@/components/modals/Compare";
import ShopCart from "@/components/modals/ShopCart";
import AskQuestion from "@/components/modals/AskQuestion";
import BlogSidebar from "@/components/modals/BlogSidebar";
import ColorCompare from "@/components/modals/ColorCompare";
import DeliveryReturn from "@/components/modals/DeliveryReturn";
import FindSize from "@/components/modals/FindSize";
import Login from "@/components/modals/Login";
import MobileMenu from "@/components/modals/MobileMenu";
import Register from "@/components/modals/Register";
import ResetPass from "@/components/modals/ResetPass";
import SearchModal from "@/components/modals/SearchModal";
import ToolbarBottom from "@/components/modals/ToolbarBottom";
import ToolbarShop from "@/components/modals/ToolbarShop";

import { usePathname } from "next/navigation";
import NewsletterModal from "@/components/modals/NewsletterModal";
import ShareModal from "@/components/modals/ShareModal";
import ScrollTop from "@/components/common/ScrollTop";
import RtlToggle from "@/components/common/RtlToggle";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Importa o script apenas no lado do cliente
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Módulo importado, você pode acessar qualquer funcionalidade exportada se necessário
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 100) {
        header.classList.add("header-bg");
      } else {
        header.classList.remove("header-bg");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Função de limpeza para remover o event listener quando o componente for desmontado
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [scrollDirection, setScrollDirection] = useState("down");

  useEffect(() => {
    setScrollDirection("up");
    const lastScrollY = { current: window.scrollY };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 250) {
        if (currentScrollY > lastScrollY.current) {
          // Rolando para baixo
          setScrollDirection("down");
        } else {
          // Rolando para cima
          setScrollDirection("up");
        }
      } else {
        // Abaixo de 250px
        setScrollDirection("down");
      }

      lastScrollY.current = currentScrollY;
    };

    // Adiciona o event listener de scroll
    window.addEventListener("scroll", handleScroll);

    // Função de limpeza: remove o event listener quando o componente for desmontado
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    // Fecha qualquer modal aberto
    const bootstrap = require("bootstrap"); // Importação dinâmica do bootstrap
    const modalElements = document.querySelectorAll(".modal.show");
    modalElements.forEach((modal) => {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    });

    // Fecha qualquer offcanvas aberto
    const offcanvasElements = document.querySelectorAll(".offcanvas.show");
    offcanvasElements.forEach((offcanvas) => {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
      if (offcanvasInstance) {
        offcanvasInstance.hide();
      }
    });
  }, [pathname]); // Executa toda vez que a rota muda

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      if (scrollDirection === "up") {
        header.style.top = "0px";
      } else {
        header.style.top = "-185px";
      }
    }
  }, [scrollDirection]);

  useEffect(() => {
    const { WOW } = require("wowjs");
    const wow = new WOW({
      mobile: false,
      live: false,
    });
    wow.init();
  }, [pathname]);

  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("direction")) {
      const direction = JSON.parse(localStorage.getItem("direction")).dir;
      document.documentElement.dir = direction;
      document.body.classList.add(direction);
    } else {
      document.documentElement.dir = "ltr";
    }
    setTimeout(() => {
      setShowChild(true);
      document.getElementById("preloader").classList.add("disabled");
    }, 800);
  }, []);

  return (
    <html lang="en">
      <body className="preload-wrapper">
        <div className="preload preload-container" id="preloader">
          <div className="preload-logo">
            <div className="spinner"></div>
          </div>
        </div>
        <Context>
          {showChild ? (
            <NextAuthSessionProvider>
              <div id="wrapper">{children}</div>
              {/* <RtlToggle /> */}
              <QuickView />
              <QuickAdd />
              <ProductSidebar />
              <Compare />
              <ShopCart />
              <AskQuestion />
              <BlogSidebar />
              <ColorCompare />
              <DeliveryReturn />
              <FindSize />
              <Login />
              <MobileMenu />
              <Register />
              <ResetPass />
              <SearchModal />
              <ToolbarBottom />
              <ToolbarShop />
              {/* <NewsletterModal /> */}
              <ShareModal />
            </NextAuthSessionProvider>
          ) : (
            " "
          )}
        </Context>
        <ScrollTop />
      </body>
    </html>
  );
}
