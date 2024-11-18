import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import Topbar4 from "@/components/headers/Topbar4";

import BannerCollections from "@/components/homes/home-baby/BannerCollections";
import Brands from "@/components/homes/home-baby/Brands";
import Categories from "@/components/homes/home-baby/Categories";
import Collections from "@/components/homes/home-baby/Collections";
import Hero from "@/components/homes/home-baby/Hero";
import Products from "@/components/homes/home-baby/Products";
import Products2 from "@/components/homes/home-baby/Products2";

import React from "react";
export const metadata = {
  title: "Home Baby || VKLTech",
  description: "VKLTech",
};
export default function Page() {
  return (
    <>
      <div className="color-primary-10">
        <Topbar4 />
        <Header2 /> <Hero />
        <BannerCollections />
        <Products />
        <Categories />
        <Collections />
        <Products2 />
        <Brands />
        <Footer2 />
      </div>
    </>
  );
}
