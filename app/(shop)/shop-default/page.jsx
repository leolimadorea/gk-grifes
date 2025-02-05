"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Footer1 from "@/components/footers/Footer1";
import WhatsAppButton from "@/components/clc/Whats/WhatsAppButton";
import ShopDefault from "@/components/shop/ShopDefault";
import Header2 from "@/components/headers/Header2";

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

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <Header2 />
      <ShopDefault filteredProducts={products} />
      <Footer1 />
      <WhatsAppButton />
    </>
  );
}
