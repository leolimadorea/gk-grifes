import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import Wishlist from "@/components/othersPages/dashboard/Wishlist";

export const metadata = {
  title: "Imuno-Pump",
  description: "PatyGirls",
};
export default function Page() {
  return (
    <>
      <Header18 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">My Account Wishlist</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardNav />
            </div>
            <div className="col-lg-9">
              <Wishlist />
            </div>
          </div>
        </div>
      </section>

      <Footer1 />
    </>
  );
}
