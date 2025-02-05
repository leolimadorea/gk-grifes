import Announcement from "@/components/common/Announcement";
import Footer5 from "@/components/footers/Footer5";
import Header13 from "@/components/headers/Header13";
import Header2 from "@/components/headers/Header2";
import Banner from "@/components/homes/home-activewear/Banner";
import Collections from "@/components/homes/home-activewear/Collections";
import Countdown from "@/components/homes/home-activewear/Countdown";
import Features from "@/components/homes/home-activewear/Features";
import Features2 from "@/components/homes/home-activewear/Features2";
import Hero from "@/components/homes/home-activewear/Hero";
import Lookbook from "@/components/homes/home-activewear/Lookbook";
import Products from "@/components/homes/home-activewear/Products";
import Products2 from "@/components/homes/home-activewear/Products2";
import ShopGram from "@/components/homes/home-activewear/ShopGram";
import Testimonials from "@/components/homes/home-activewear/Testimonials";
import React from "react";

export const metadata = {
  title: "Home Activewear || CLC",
  description: "CLC",
};

export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function HomeActivewear() {
  const products = await getProducts();

  return (
    <>
      <Announcement bgColor="bg_violet-1" />
      <Header2 />
      <Hero />
      <Features />
      <Collections />
      <Products products={products} />
      <Countdown />
      <Products2 />
      <Lookbook />
      <Banner />
      <Features2 />
      <Testimonials />
      <ShopGram />
      <Footer5 bgColor="background-gray" />
    </>
  );
}
