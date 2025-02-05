import Footer4 from "@/components/footers/Footer4";

import Header2 from "@/components/headers/Header2";
import Brands from "@/components/homes/home-1/Brands";
import Features from "@/components/homes/home-6/Features";
import Banner from "@/components/homes/home-skateboard/Banner";
import Categories from "@/components/homes/home-skateboard/Categories";
import Collections from "@/components/homes/home-skateboard/Collections";
import Hero from "@/components/homes/home-skateboard/Hero";
import Marquee from "@/components/homes/home-skateboard/Marquee";
import Products from "@/components/homes/home-skateboard/Products";
import Products2 from "@/components/homes/home-skateboard/Products2";
import Testimonials from "@/components/homes/home-skateboard/Testimonials";
import React from "react";

export const metadata = {
  title: "Home Skateboard || CLC",
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

export default async function HomeSkateboard() {
  const products = await getProducts();

  return (
    <>
      <Header2 />

      <Hero />
      <Marquee />
      <Collections />
      <div className="mt-5"></div>
      <Brands />
      <Categories />
      <Products products={products} />
      <Banner />
      <Products2 />
      <Testimonials />
      <Features />
      <Footer4 />
    </>
  );
}
