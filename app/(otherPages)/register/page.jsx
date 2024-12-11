import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import Register from "@/components/othersPages/Register";
import React from "react";

export const metadata = {
  title: "Register || PatyGirls",
  description: "PatyGirls",
};
export default function Page() {
  return (
    <>
      <Header18 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Register</div>
        </div>
      </div>

      <Register />
      <Footer1 />
    </>
  );
}
