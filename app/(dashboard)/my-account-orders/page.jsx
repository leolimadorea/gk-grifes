import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import Orders from "@/components/othersPages/dashboard/Orders";

export const metadata = {
  title: "Imuno-Pump",
  description: "VKLTech",
};
export default function Page() {
  return (
    <>
      <Header2 />
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

      <Footer2 />
    </>
  );
}
