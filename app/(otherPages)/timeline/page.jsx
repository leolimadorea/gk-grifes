import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import Header2 from "@/components/headers/Header2";
import Timelines from "@/components/othersPages/Timelines";
import React from "react";

export const metadata = {
  title: "Timeline || Ecomus - Ultimate Nextjs Ecommerce Template",
  description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
  return (
    <>
      <Header18 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Timeline</div>
        </div>
      </div>

      <Timelines />
      <Footer1 />
    </>
  );
}
