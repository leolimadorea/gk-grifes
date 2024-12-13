import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import Login from "@/components/othersPages/Login";
import React from "react";

export const metadata = {
  title: "Login || CLC",
  description: "CLC",
};
export default function Page() {
  return (
    <>
      <Header18 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Log in</div>
        </div>
      </div>

      <Login />
      <Footer1 />
    </>
  );
}
