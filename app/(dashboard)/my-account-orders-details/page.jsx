import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";

import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import OrderDetails from "@/components/othersPages/dashboard/OrderDetails";
import Orders from "@/components/othersPages/dashboard/Orders";
import React from "react";

export const metadata = {
  title: " VKLTech",
  description: "VKLTech",
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
              <OrderDetails />
            </div>
          </div>
        </div>
      </section>

      <Footer2 />
    </>
  );
}
