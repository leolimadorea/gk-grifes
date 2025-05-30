import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Topbar2 from "@/components/headers/Topbar2";
import Products from "@/components/homes/home-search/Products";
import React from "react";

export const metadata = {
  title: "Home Search || CLC",
  description: "CLC",
};
export default function Page() {
  return (
    <>
      <Topbar2 />
      <Header2 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Search</div>
        </div>
      </div>
      <Products />
      <Footer1 />
    </>
  );
}
