import Topbar4 from "@/components/headers/Topbar4";
import Footer1 from "@/components/footers/Footer1";

import Hero from "@/components/homes/home-grocery/Hero";

import Header2 from "@/components/headers/Header2";
import Categories from "@/components/homes/home-grocery/Categories";
import Collections from "@/components/homes/home-grocery/Collections";
import Products from "@/components/homes/home-grocery/Products";
import Products2 from "@/components/homes/home-grocery/Products2";

export const metadata = {
  title: "Home Grocery || CLC",
  description: "CLC",
};
export default function Page() {
  return (
    <>
      <Topbar4 />
      <Header2 />
      <Hero />
      <Categories />
      <Collections />
      <Products />
      <Products2 />
      {/* <Features />
        <Banner /> */}
      <Footer1 />
    </>
  );
}
