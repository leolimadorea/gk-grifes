import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import PaymentFailure from "@/components/othersPages/PaymentFailure";
import React from "react";

export const metadata = {
  title: "Payment Failure || CLC",
  description: "CLC",
};
export default function Page() {
  return (
    <>
      <Header18 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Payment Failure</div>
        </div>
      </div>

      <PaymentFailure />
      <Footer1 />
    </>
  );
}
