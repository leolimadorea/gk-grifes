"use client";

import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import Context from "../context/Context.jsx";
import "../public/scss/main.scss";
import NextAuthSessionProvider from "./SessionProvider";

import AskQuestion from "@/components/modals/AskQuestion";
import BlogSidebar from "@/components/modals/BlogSidebar";
import ColorCompare from "@/components/modals/ColorCompare";
import Compare from "@/components/modals/Compare";
import DeliveryReturn from "@/components/modals/DeliveryReturn";
import FindSize from "@/components/modals/FindSize";
import Login from "@/components/modals/Login";
import MobileMenu from "@/components/modals/MobileMenu";
import ProductSidebar from "@/components/modals/ProductSidebar";
import QuickAdd from "@/components/modals/QuickAdd";
import QuickView from "@/components/modals/QuickView";
import Register from "@/components/modals/Register";
import ResetPass from "@/components/modals/ResetPass";
import SearchModal from "@/components/modals/SearchModal";
import ShopCart from "@/components/modals/ShopCart";
import ToolbarBottom from "@/components/modals/ToolbarBottom";
import ToolbarShop from "@/components/modals/ToolbarShop";

import ScrollTop from "@/components/common/ScrollTop";
import ShareModal from "@/components/modals/ShareModal";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.esm").then(() => {});
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
    if (typeof window !== "undefined") {
      import("bootstrap").then((bootstrap) => {
        const modalElements = document.querySelectorAll(".modal.show");
        modalElements.forEach((modal) => {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          if (modalInstance) modalInstance.hide();
        });

        const offcanvasElements = document.querySelectorAll(".offcanvas.show");
        offcanvasElements.forEach((offcanvas) => {
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
          if (offcanvasInstance) offcanvasInstance.hide();
        });
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const header = document.querySelector("header");
      if (header) {
        if (scrollDirection === "up") {
          header.style.top = "0px";
        } else {
          header.style.top = "-185px";
        }
      }
    }
  }, [scrollDirection]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("wowjs").then(({ WOW }) => {
        const wow = new WOW({
          mobile: false,
          live: false,
        });
        wow.init();
      });
    }
  }, [pathname]);

  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const direction = localStorage.getItem("direction")
        ? JSON.parse(localStorage.getItem("direction")).dir
        : "ltr";
      document.documentElement.dir = direction;
      document.body.classList.add(direction);
      setTimeout(() => {
        setShowChild(true);
        document.getElementById("preloader").classList.add("disabled");
      }, 800);
    }
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
          {showChild && (
            <NextAuthSessionProvider>
              <div id="wrapper">{children}</div>
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
              <ShareModal />
            </NextAuthSessionProvider>
          )}
        </Context>
        <ScrollTop />
      </body>
    </html>
  );
}
