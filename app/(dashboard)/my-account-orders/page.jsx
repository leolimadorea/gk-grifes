import Footer1 from "@/components/footers/Footer1";
import Header6 from "@/components/headers/Header6";
import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import Orders from "@/components/othersPages/dashboard/Orders";

export const metadata = {
  title: "Imuno-Pump",
  description: "ImunoPump",
};
export default function Page() {
  return (
    <>
      <Header6 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">My Orders</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardNav />
            </div>
            <div className="col-lg-9">
              <Orders />
            </div>
          </div>
        </div>
      </section>

      <Footer1 />
    </>
  );
}
