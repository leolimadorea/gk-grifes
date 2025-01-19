import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import ContactForm from "@/components/othersPages/contact/ContactForm";
import Map from "@/components/othersPages/contact/Map";
import Map2 from "@/components/othersPages/contact/Map2";
import React from "react";
import WhatsAppButton from "@/components/clc/Whats/WhatsAppButton";

export const metadata = {
  title: "Contact 1 || CLC",
  description: "CLC",
};
export default function Page() {
  return (
    <>
      <Header2 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Entre em contato</div>
        </div>
      </div>

      <Map2 />

      <Footer1 />
      <WhatsAppButton />
    </>
  );
}
