import Testimonials from "@/components/common/Testimonials";
import Footer3 from "@/components/footers/Footer3";
import Header6 from "@/components/headers/Header6";
import Header5 from "@/components/headers/Header5";

import Banner from "@/components/homes/home-7/Banner";
import Categories from "@/components/homes/home-7/Categories";
import Countdown from "@/components/homes/home-7/Countdown";
import Hero from "@/components/homes/home-7/Hero";
import Marquee from "@/components/homes/home-7/Marquee";
import Products from "@/components/homes/home-7/Products";
import React from "react";

export const metadata = {
  title: "Home 7 || Drogaria VivaMais",
  description: "Drogaria VivaMais",
};
export default function Page() {
  return (
    <>
      <Header6 />
      <Hero />
      <Marquee />
      <Products />
      <Countdown />
      <Categories />
      <Banner />
      <Testimonials />
      <Footer3 />
    </>
  );
}
