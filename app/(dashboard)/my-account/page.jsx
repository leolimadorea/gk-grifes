import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import MyAccount from "@/components/othersPages/dashboard/MyAccount";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Imuno-Pump",
  description: "VKLTech",
};

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

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
              <MyAccount />
            </div>
          </div>
        </div>
      </section>

      <Footer2 />
    </>
  );
}
