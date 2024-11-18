import Features from "@/components/common/Features2";
import Footer2 from "@/components/footers/Footer2";
import Header16 from "@/components/headers/Header16";
import Header2 from "@/components/headers/Header2";
import Banner from "@/components/homes/home-men/Banner";
import Blogs from "@/components/homes/home-men/Blogs";
import CollectionBanner from "@/components/homes/home-men/CollectionBanner";
import Collections from "@/components/homes/home-men/Collections";
import Countdown from "@/components/homes/home-men/Countdown";
import Hero from "@/components/homes/home-men/Hero";
import Marquee from "@/components/homes/home-men/Marquee";
import Products from "@/components/homes/home-men/Products";
import Announcment from "@/components/homes/multi-brand/Announcment";

import React from "react";

export const metadata = {
  title: "Home Men || ImunoPump",
  description: "ImunoPump",
};
export default function Page() {
  return (
    <>
      <Announcment />
      <Header2 />
      <Hero />
      <Countdown />
      <Collections />
      <Banner />
      <Products />
      <CollectionBanner />
      <Features bgColor="" />
      <Blogs />
      <Marquee />
      <Footer1 bgColor="background-gray" />
    </>
  );
}
