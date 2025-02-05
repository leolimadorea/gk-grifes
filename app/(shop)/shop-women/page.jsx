import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import ShopDefault from "@/components/shop/ShopDefault";
import React from "react";

export const metadata = {
  title: "Shop Women || CLC",
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

export default async function ShopWomenPage() {
  const products = await getProducts();

  return (
    <>
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Shop Women</div>
          <p className="text-center text-2 text_black-2 mt_5">
            Shop through our latest selection of Fashion
          </p>
        </div>
      </div>
      <ShopDefault filteredProducts={products} />
      <Footer1 />
    </>
  );
}
