import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import Header4 from "@/components/headers/Header4";
import Features from "@/components/homes/home-6/Features";
import Announcment from "@/components/homes/home-furniture/Announcment";
import Banner from "@/components/homes/home-furniture/Banner";
import Categories from "@/components/homes/home-furniture/Categories";
import Collection from "@/components/homes/home-furniture/Collection";
import Hero from "@/components/homes/home-furniture/Hero";
import Lookbook from "@/components/homes/home-furniture/Lookbook";
import Products from "@/components/homes/home-furniture/Products";
import ShopGram from "@/components/homes/home-furniture/ShopGram";
import React from "react";

export const metadata = {
  title: "Home Furniture || ImunoPump",
  description: "ImunoPump",
};
export default function Page() {
  return (
    <>
      <div className="color-primary-2">
        <Announcment />
        <Header2 /> <Hero />
        <Collection />
        <Categories />
        <Banner />
        <Products />
        <Lookbook />
        <Features />
        <ShopGram />
        <Footer1 bgColor="background-gray" />
      </div>
    </>
  );
}
