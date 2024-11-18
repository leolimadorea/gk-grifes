import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import Topbar1 from "@/components/headers/Topbar1";

import ProductStyle3 from "@/components/shop/ProductStyle3";
import ProductStyle4 from "@/components/shop/ProductStyle4";
import React from "react";

export const metadata = {
  title: "Product Style 5 || ImunoPump",
  description: "ImunoPump",
};
export default function Page() {
  return (
    <>
      <Topbar1 />
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">New Arrival</div>
          <p className="text-center text-2 text_black-2 mt_5">
            Shop through our latest selection of Fashion
          </p>
        </div>
      </div>
      <ProductStyle4 />
      <Footer2 />
    </>
  );
}
