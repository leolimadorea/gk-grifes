import Topbar4 from "@/components/headers/Topbar4";
import Footer1 from "@/components/footers/Footer1";

import Hero from "@/components/homes/home-grocery/Hero";

import Header2 from "@/components/headers/Header2";
import Categories from "@/components/homes/home-grocery/Categories";
import Collections from "@/components/homes/home-grocery/Collections";
import Products from "@/components/homes/home-grocery/Products";
import Products2 from "@/components/homes/home-grocery/Products2";

export const metadata = {
  title: "Home Grocery || CLC",
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

export default async function HomeGrocery() {
  const products = await getProducts();

  return (
    <>
      <Topbar4 />
      <Header2 />
      <Hero />
      <Categories />
      <Collections />
      <Products products={products} />
      <Products2 />
      {/* <Features />
        <Banner /> */}
      <Footer1 />
    </>
  );
}
