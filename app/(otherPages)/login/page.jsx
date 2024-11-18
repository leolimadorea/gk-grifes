import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import Header2 from "@/components/headers/Header2";
import Login from "@/components/othersPages/Login";
import React from "react";

export const metadata = {
  title: "Login || ImunoPump",
  description: "ImunoPump",
};
export default function Page() {
  return (
    <>
      <Header2 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Log in</div>
        </div>
      </div>

      <Login />
      <Footer2 />
    </>
  );
}
