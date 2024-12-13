import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";

import AccountEdit from "@/components/othersPages/dashboard/AccountEdit";
import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import React from "react";

export const metadata = {
  title: " CLC",
  description: "Ecomus - Ultimate React Nextjs Ecommerce Template",
};
export default function Page() {
  return (
    <>
      <Header18 />

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

      <Footer1 />
    </>
  );
}
