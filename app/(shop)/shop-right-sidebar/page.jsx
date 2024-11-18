import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import Header2 from "@/components/headers/Header2";
import Topbar1 from "@/components/headers/Topbar1";
import ShopSidebarRight from "@/components/shop/ShopSidebarRight";
import React from "react";

export const metadata = {
  title: "Shop Right Sidebar || ImunoPump",
  description: "ImunoPump",
};
export default function Page() {
  return (
    <>
      <Topbar1 /> <Header2 />
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
      <ShopSidebarRight />
      <Footer2 />
    </>
  );
}
