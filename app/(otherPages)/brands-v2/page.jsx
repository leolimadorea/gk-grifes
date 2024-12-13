import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import Brands2 from "@/components/othersPages/brands/Brands2";
import React from "react";

export const metadata = {
  title: "Brands 2 || CLC",
  description: "CLC",
};
export default function Page() {
  return (
    <>
      <Header18 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Brands v2</div>
        </div>
      </div>

      <Brands2 />
      <Footer1 />
    </>
  );
}
