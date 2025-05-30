import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Topbar1 from "@/components/headers/Topbar1";

import Wishlist from "@/components/othersPages/Wishlist";
import React from "react";

export const metadata = {
  title: "Wishlist || CLC",
  description: "CLC",
};
export default function Page() {
  return (
    <>
      <Topbar1 />
      <Header2 />
      <div className="tf-page-title ">
        <div className="container-full">
          <div className="heading text-center">Your wishlist</div>
        </div>
      </div>

      <Wishlist />

      <Footer1 />
    </>
  );
}
