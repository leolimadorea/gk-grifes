import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import Topbar2 from "@/components/headers/Topbar2";
import Products from "@/components/homes/home-search/Products";
import React from "react";

export const metadata = {
  title: "Home Search || PatyGirls",
  description: "PatyGirls",
};
export default function Page() {
  return (
    <>
      <Topbar2 />
      <Header18 />
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
