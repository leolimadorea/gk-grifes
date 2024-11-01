import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import Header2 from "@/components/headers/Header2";
import OurStore from "@/components/othersPages/OurStore";
import React from "react";

export const metadata = {
  title: "Our Stores || Drogaria VivaMais",
  description: "Drogaria VivaMais",
};
export default function Page() {
  return (
    <>
      <Header18 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Our Store</div>
        </div>
      </div>

      <OurStore />
      <Footer1 />
    </>
  );
}
