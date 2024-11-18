import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import ShopDefault from "@/components/shop/ShopDefault";
import React from "react";

export const metadata = {
  title: "Shop Filter Hidden  || VKLTech",
  description: "VKLTech",
};
export default function Page() {
  return (
    <>
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">New Arrival</div>
          <p className="text-center text-2 text_black-2 mt_5">
            Shop through our latest selection of Fashion
          </p>
        </div>
      </div>
      <ShopDefault />
      <Footer2 />
    </>
  );
}
