import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Topbar1 from "@/components/headers/Topbar1";
import ShopSidebarRight from "@/components/shop/ShopSidebarRight";
import React from "react";

export const metadata = {
  title: "Shop Right Sidebar || CLC",
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

export default async function Page() {
  const products = await getProducts();

  return (
    <>
      <Topbar1 />
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <div className="heading text-center">New Arrival</div>
              <p className="text-center text-2 text_black-2 mt_5">
                Shop through our latest selection of Fashion
              </p>
            </div>
          </div>
        </div>
      </div>
      <ShopSidebarRight products={products} />
      <Footer1 />
    </>
  );
}
