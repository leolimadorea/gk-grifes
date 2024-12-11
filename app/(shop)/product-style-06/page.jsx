import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import Topbar1 from "@/components/headers/Topbar1";
import ProductStyle6 from "@/components/shop/ProductStyle6";
import React from "react";

export const metadata = {
  title: "Product Style 6 || PatyGirls",
  description: "PatyGirls",
};
export default function Page() {
  return (
    <>
      <Topbar1 />
      <Header18 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">New Arrival</div>
          <p className="text-center text-2 text_black-2 mt_5">
            Shop through our latest selection of Fashion
          </p>
        </div>
      </div>
      <ProductStyle6 />
      <Footer1 />
    </>
  );
}
