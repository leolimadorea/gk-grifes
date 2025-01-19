import Testimonials from "@/components/common/Testimonials";
import Footer1 from "@/components/footers/Footer1";

import Header2 from "@/components/headers/Header2";
import Cart from "@/components/othersPages/Cart";
import RecentProducts from "@/components/shopDetails/RecentProducts";
import React from "react";
import WhatsAppButton from "@/components/clc/Whats/WhatsAppButton";

export const metadata = {
  title: " CLC",
  description: "CLC",
};
export default function Page() {
  return (
    <>
      <Header2 />

      <Cart />

      <Footer1 />
      <WhatsAppButton />
    </>
  );
}
