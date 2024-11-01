import Footer1 from "@/components/footers/Footer1";

import Hero from "@/components/homes/home-grocery/Hero";
import axios from "axios";
import Header18 from "@/components/headers/Header18";
import Categories from "@/components/homes/home-grocery/Categories";
import Collections from "@/components/homes/home-grocery/Collections";
import Products from "@/components/homes/home-grocery/Products";
import Products2 from "@/components/homes/home-grocery/Products2";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
  title: "Drogaria VivaMais",
};
export default async function page() {
  const res = await axios.get(`http://localhost:3000/api/products`);
  const products = res.data;
  const session = await getServerSession(authOptions);
  console.log(session, "session");
  return (
    <>
      <div className="color-primary-8 color-main-text-2">
        {/* <Topbar4 /> */}
        <Header18 />
        <Hero />
        <Categories />
        <Collections />
        <Products products={products} />
        <Products2 products={products} />
        {/* <Features />
        <Banner /> */}
        <Footer1 />
      </div>
    </>
  );
}
