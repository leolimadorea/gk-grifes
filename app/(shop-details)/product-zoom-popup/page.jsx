import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import DefaultShopDetails from "@/components/shopDetails/DefaultShopDetails";
import Products from "@/components/shopDetails/Products";
import RecentProducts from "@/components/shopDetails/RecentProducts";
import ShopDetailsTab from "@/components/shopDetails/ShopDetailsTab";
import React from "react";
import Link from "next/link";
import DetailsOuterZoom from "@/components/shopDetails/DetailsOuterZoom";

export const metadata = {
  title: "Product Zoom Popup || CLC",
  description: "CLC",
};

export const dynamic = "force-dynamic";

async function getProduct(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
    );
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage() {
  const product = await getProduct(1); // ID do produto

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header2 />
      <div className="tf-breadcrumb">
        <div className="container">
          <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
            <div className="tf-breadcrumb-list">
              <Link href={`/`} className="text">
                Home
              </Link>
              <i className="icon icon-arrow-right" />
              <a href="#" className="text">
                Women
              </a>
              <i className="icon icon-arrow-right" />
              <span className="text">Cotton jersey top</span>
            </div>
            <div className="tf-breadcrumb-prev-next">
              <a href="#" className="tf-breadcrumb-prev hover-tooltip center">
                <i className="icon icon-arrow-left" />
                {/* <span className="tooltip">Cotton jersey top</span> */}
              </a>
              <a href="#" className="tf-breadcrumb-back hover-tooltip center">
                <i className="icon icon-shop" />
                {/* <span className="tooltip">Back to Women</span> */}
              </a>
              <a href="#" className="tf-breadcrumb-next hover-tooltip center">
                <i className="icon icon-arrow-right" />
                {/* <span className="tooltip">Cotton jersey top</span> */}
              </a>
            </div>
          </div>
        </div>
      </div>
      <DetailsOuterZoom product={product} />
      <ShopDetailsTab />
      <Products />
      <RecentProducts />
      <Footer1 />
    </>
  );
}
