import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";

import AccountEdit from "@/components/othersPages/dashboard/AccountEdit";
import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import React from "react";

export const metadata = {
  title: " VKLTech",
  description: "Ecomus - Ultimate React Nextjs Ecommerce Template",
};
export default function Page() {
  return (
    <>
      <Header2 />

      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardNav />
            </div>
            <div className="col-lg-9">
              <AccountEdit />
            </div>
          </div>
        </div>
      </section>

      <Footer2 />
    </>
  );
}
