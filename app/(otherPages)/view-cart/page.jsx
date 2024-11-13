import Testimonials from "@/components/common/Testimonials";
import Footer1 from "@/components/footers/Footer1";
import Header6 from "@/components/headers/Header6";
import Header2 from "@/components/headers/Header2";
import Cart from "@/components/othersPages/Cart";
import RecentProducts from "@/components/shopDetails/RecentProducts";
import React from "react";

export const metadata = {
  title: " Drogaria VivaMais",
  description: "Drogaria VivaMais",
};
export default function Page() {
  return (
    <>
      <div className="color-primary-8 color-main-text-2">
        <Header6 />
        <div className="tf-page-title">
          <div className="container-full"></div>
        </div>

        <Cart />

        <Footer1 />
      </div>
    </>
  );
}
