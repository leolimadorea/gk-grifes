import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Topbar1 from "@/components/headers/Topbar1";
import ShopCollections from "@/components/shop/ShopCollections";

import React from "react";

export const metadata = {
  title: "Product Collection List || CLC",
  description: "CLC",
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
      <ShopCollections />
      <Footer1 />
    </>
  );
}
