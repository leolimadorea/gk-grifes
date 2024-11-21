import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import PaymentConfirmation from "@/components/othersPages/PaymentConfirmation";
import React from "react";

export const metadata = {
  title: "Payment Confirmation || VKLTech",
  description: "VKLTech",
};
export default function Page() {
  return (
    <>
      <Header18 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Payment confirmation</div>
        </div>
      </div>

      <PaymentConfirmation />
      <Footer1 />
    </>
  );
}
