import Testimonials from "@/components/common/Testimonials";
import Footer2 from "@/components/footers/Footer2";

import Header2 from "@/components/headers/Header2";
import Cart from "@/components/othersPages/Cart";
import RecentProducts from "@/components/shopDetails/RecentProducts";
import React from "react";

export const metadata = {
  title: " ImunoPump",
  description: "ImunoPump",
};
export default function Page() {
  return (
    <>
      <div className="color-primary-8 color-main-text-2">
        <Header2 />
        <div className="tf-page-title">
          <div className="container-full"></div>
        </div>

        <Cart />

        <Footer2 />
      </div>
    </>
  );
}
