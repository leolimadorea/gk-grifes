import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";

import Topbar1 from "@/components/headers/Topbar1";
import BannerCollection from "@/components/homes/home-2/BannerCollection";
import Brands from "@/components/homes/home-2/Brands";
import Categories from "@/components/homes/home-2/Categories";
import Collection from "@/components/homes/home-2/Collection";
import Hero from "@/components/homes/home-2/Hero";
import Products from "@/components/homes/home-2/Products";
import Store from "@/components/homes/home-2/Store";
import React from "react";

export default function Page() {
  return (
    <>
      <Topbar1 />
      <Header2 />
      <Hero />
      <Categories />
      <Collection />
      <Products />
      <BannerCollection />
      <Store />
      <Brands />
      <Footer2 />
    </>
  );
}
