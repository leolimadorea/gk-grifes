import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import StoreLocations from "@/components/othersPages/StoreLocations";
import React from "react";

export const metadata = {
  title: "Store Locations || PatyGirls",
  description: "PatyGirls",
};
export default function Page() {
  return (
    <>
      <Header18 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Store locations</div>
        </div>
      </div>

      <StoreLocations />
      <Footer1 />
    </>
  );
}
