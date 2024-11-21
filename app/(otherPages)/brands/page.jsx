import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import Brands from "@/components/othersPages/brands/Brands";
import React from "react";

export const metadata = {
  title: "Brands || VKLTech",
  description: "VKLTech",
};
export default function Page() {
  return (
    <>
      <Header18 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Brands</div>
        </div>
      </div>

      <Brands />
      <Footer1 />
    </>
  );
}
