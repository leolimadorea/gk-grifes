import Topbar4 from "@/components/headers/Topbar4";
import Footer2 from "@/components/footers/Footer2";

import Hero from "@/components/homes/home-grocery/Hero";

import Header2 from "@/components/headers/Header2";
import Categories from "@/components/homes/home-grocery/Categories";
import Collections from "@/components/homes/home-grocery/Collections";
import Products from "@/components/homes/home-grocery/Products";
import Products2 from "@/components/homes/home-grocery/Products2";

export const metadata = {
  title: "Home Grocery || VKLTech",
  description: "VKLTech",
};
export default function Page() {
  return (
    <>
      <div className="color-primary-8 color-main-text-2">
        <Topbar4 />
        <Header2 />
        <Hero />
        <Categories />
        <Collections />
        <Products />
        <Products2 />
        {/* <Features />
        <Banner /> */}
        <Footer2 />
      </div>
    </>
  );
}
