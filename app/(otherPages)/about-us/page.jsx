import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import About from "@/components/othersPages/about/About";
import Features from "@/components/othersPages/about/Features";
import FlatTitle from "@/components/othersPages/about/FlatTitle";
import Hero from "@/components/othersPages/about/Hero";
import ShopGram from "@/components/othersPages/about/ShopGram";
import Testimonials from "@/components/othersPages/about/Testimonials";
import React from "react";
import WhatsAppButton from "@/components/clc/Whats/WhatsAppButton";

export const metadata = {
  title: "About Us || CLC",
  description: "CLC",
};
export default function Page() {
  return (
    <>
      <Header2 />
      <Hero />
      <FlatTitle />
      <div className="container">
        <div className="line"></div>
      </div>
      {/* <About /> */}
      <Features />
      {/* <Testimonials /> */}
      <div className="container">
        <div className="line"></div>
      </div>
      {/* <ShopGram /> */}
      <Footer1 />
      <WhatsAppButton />
    </>
  );
}
