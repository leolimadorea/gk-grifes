import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import ShopDefault from "@/components/shop/ShopDefault";
import axios from "axios";
import React from "react";

export const metadata = {
  title: " Drogaria VivaMais",
  description: "Drogaria VivaMais",
};
export default async function page() {
  const res = await axios.get(`http://localhost:3000/api/products`);
  const products = res.data;
  return (
    <>
      <div className="color-primary-8 color-main-text-2">
        <Header18 />
        <div className="tf-page-title">
          <div className="container-full">
            <div className="heading text-center"></div>
          </div>
        </div>
        <ShopDefault products={products} />
        <Footer1 />
      </div>
    </>
  );
}
