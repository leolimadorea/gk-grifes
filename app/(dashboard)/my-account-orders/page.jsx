import { getUserOrders } from "@/app/db/getOrders/getUserOrders";
import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import Orders from "@/components/othersPages/dashboard/Orders";
import { getServerSession } from "next-auth";

// export const metadata = {
//   title: "Imuno-Pump",
//   description: "VKLTech",
// };
export default async function Page() {
  const session = await getServerSession();

  const orders = await getUserOrders(session.user.email);
  console.log(orders);
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

      <Footer2 />
    </>
  );
}
