import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import MyAccount from "@/components/othersPages/dashboard/MyAccount";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Drogaria VivaMais",
  description: "Drogaria VivaMais",
};

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Header18 />
      <div className="tf-page-title">
        <div className="container-full"></div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardNav />
            </div>
            <div className="col-lg-9">
              <MyAccount />
            </div>
          </div>
        </div>
      </section>

      <Footer1 />
    </>
  );
}
