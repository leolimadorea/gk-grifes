import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import Topbar1 from "@/components/headers/Topbar1";

import ProductStyle5 from "@/components/shop/ProductStyle5";
import React from "react";

export const metadata = {
  title: "Product Style 5 || CLC",
  description: "CLC",
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
      <ProductStyle5 />
      <Footer1 />
    </>
  );
}
