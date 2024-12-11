import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import ShopDefault from "@/components/shop/ShopDefault";
import React from "react";

export const metadata = {
  title: "Shop Women || PatyGirls",
  description: "PatyGirls",
};
export default function Page() {
  return (
    <>
      <Header18 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Shop Women</div>
          <p className="text-center text-2 text_black-2 mt_5">
            Shop through our latest selection of Fashion
          </p>
        </div>
      </div>
      <ShopDefault />
      <Footer1 />
    </>
  );
}
