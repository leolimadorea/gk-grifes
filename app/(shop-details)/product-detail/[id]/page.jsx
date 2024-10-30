import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Products from "@/components/shopDetails/Products";
import RecentProducts from "@/components/shopDetails/RecentProducts";
import ShopDetailsTab from "@/components/shopDetails/ShopDetailsTab";
import React from "react";
import Link from "next/link";
import DetailsOuterZoom from "@/components/shopDetails/DetailsOuterZoom";
import { allProducts } from "@/data/products";
import Header18 from "@/components/headers/Header18";
import axios from "axios";

export const metadata = {
  title: "Shop Details || Ecomus - Ultimate Nextjs Ecommerce Template",
  description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};

export default async function Page({ params }) {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  const product = res.data;

  return (
    <>
      <div className="color-primary-8 color-main-text-2">
        <Header18 />
        <div className="tf-breadcrumb">
          <div className="container">
            <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
              <div className="tf-breadcrumb-list">
                <Link href={`/`} className="text">
                  Home
                </Link>
                <i className="icon icon-arrow-right" />
                <span className="text">
                  {product.title || "Cotton jersey top"}
                </span>
              </div>
              <div className="tf-breadcrumb-prev-next">
                <a href="#" className="tf-breadcrumb-prev hover-tooltip center">
                  <i className="icon icon-arrow-left" />
                </a>
                <a href="#" className="tf-breadcrumb-back hover-tooltip center">
                  <i className="icon icon-shop" />
                </a>
                <a href="#" className="tf-breadcrumb-next hover-tooltip center">
                  <i className="icon icon-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <DetailsOuterZoom product={product} />
        <ShopDetailsTab />
        {/* <Products /> */}
        <RecentProducts />
        <Footer1 />
      </div>
    </>
  );
}
