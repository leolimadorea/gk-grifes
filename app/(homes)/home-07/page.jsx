import Testimonials from "@/components/common/Testimonials";
import Footer3 from "@/components/footers/Footer3";
import Header2 from "@/components/headers/Header2";
import Header5 from "@/components/headers/Header5";

import Banner from "@/components/homes/home-7/Banner";
import Categories from "@/components/homes/home-7/Categories";
import Countdown from "@/components/homes/home-7/Countdown";
import Hero from "@/components/homes/home-7/Hero";
import Marquee from "@/components/homes/home-7/Marquee";
import Products from "@/components/homes/home-7/Products";
import React from "react";

export const metadata = {
  title: "Home 7 || CLC",
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

export default async function Home07() {
  const products = await getProducts();

  return (
    <>
      <Header2 />
      <Hero />
      <Marquee />
      <Products products={products} />
      <Countdown />
      <Categories />
      <Banner />
      <Testimonials />
      <Footer3 />
    </>
  );
}
