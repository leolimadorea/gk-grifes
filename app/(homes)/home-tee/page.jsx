import Features from "@/components/common/Features2";
import Footer5 from "@/components/footers/Footer5";
import Header6 from "@/components/headers/Header6";
import Header2 from "@/components/headers/Header2";
import Banner from "@/components/homes/home-tee/Banner";
import Categories from "@/components/homes/home-tee/Categories";
import Hero from "@/components/homes/home-tee/Hero";
import Products from "@/components/homes/home-tee/Products";
import Products2 from "@/components/homes/home-tee/Products2";
import ShopGram from "@/components/homes/home-tee/ShopGram";
import Testimonials from "@/components/homes/home-tee/Testimonials";
import React from "react";

export const metadata = {
  title: "Home Tee || Drogaria VivaMais",
  description: "Drogaria VivaMais",
};
export default function Page() {
  return (
    <>
      <Header18 uppercase isArrow={false} Linkfs="fs-14" />
      <Hero />
      <Features titleFont="font-caprasimo" bgColor="" />
      <Categories />
      <Banner />
      <Products />
      <Products2 />
      <Testimonials />
      <ShopGram />
      <Footer5 />
    </>
  );
}
