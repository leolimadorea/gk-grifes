import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Topbar3 from "@/components/headers/Topbar3";
import BannerCountdown from "@/components/homes/home-5/BannerCountdown";
import Collection from "@/components/homes/home-5/Collection";
import Features from "@/components/homes/home-5/Features";
import Hero from "@/components/homes/home-5/Hero";
import Lookbook from "@/components/homes/home-5/Lookbook";
import Products from "@/components/homes/home-5/Products";
import ShopGram from "@/components/homes/home-5/ShopGram";
import React from "react";

export const metadata = {
  title: "Home 5 || CLC",
  description: "CLC",
};
export default function Page() {
  return (
    <>
      <Topbar3 />
      <Header2 />
      <Hero />
      <Collection />
      <Products />
      <BannerCountdown />
      <Lookbook />
      <Features />
      <ShopGram />
      <Footer1 />
    </>
  );
}
