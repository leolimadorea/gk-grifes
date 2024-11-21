import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import Topbar1 from "@/components/headers/Topbar1";

import Wishlist from "@/components/othersPages/Wishlist";
import React from "react";

export const metadata = {
  title: "Wishlist || VKLTech",
  description: "VKLTech",
};
export default function Page() {
  return (
    <>
      <Topbar1 />
      <Header18 />
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
