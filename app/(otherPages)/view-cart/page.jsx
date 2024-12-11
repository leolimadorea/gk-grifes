import Testimonials from "@/components/common/Testimonials";
import Footer1 from "@/components/footers/Footer1";

import Header18 from "@/components/headers/Header18";
import Cart from "@/components/othersPages/Cart";
import RecentProducts from "@/components/shopDetails/RecentProducts";
import React from "react";

export const metadata = {
  title: " PatyGirls",
  description: "PatyGirls",
};
export default function Page() {
  return (
    <>
      <Header18 />

      <Cart />

      <Footer1 />
    </>
  );
}
