import { getUserOrders } from "@/app/db/getOrders/getUserOrders";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import Orders from "@/components/othersPages/dashboard/Orders";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  const orders = await getUserOrders(session.user.email);

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
              <Orders orders={orders} />
            </div>
          </div>
        </div>
      </section>

      <Footer1 />
    </>
  );
}
