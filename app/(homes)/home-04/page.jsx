import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Topbar2 from "@/components/headers/Topbar2";
import Categories from "@/components/homes/home-4/Categories";
import Categories2 from "@/components/homes/home-4/Categories2";
import Hero from "@/components/homes/home-4/Hero";
import Marquee from "@/components/homes/home-4/Marquee";
import Products from "@/components/homes/home-4/Products";
import ShopGram from "@/components/homes/home-4/ShopGram";
import Testimonials from "@/components/homes/home-4/Testimonials";
import React from "react";

export const metadata = {
  title: "Home 4 || CLC",
  description: "CLC",
};
export default function Page() {
  return (
    <>
      <Topbar2 />
      <Header2 />
      <Hero />
      <Marquee />
      <Categories />
      <Products />
      <Testimonials />
      <Categories2 />
      <Features />
      <ShopGram />
      <div className="mb-lg-0 mb-sm-4"></div>
      <Footer1 />
    </>
  );
}
