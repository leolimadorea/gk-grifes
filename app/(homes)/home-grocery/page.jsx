import Topbar4 from "@/components/headers/Topbar4";
import Footer1 from "@/components/footers/Footer1";

import Hero from "@/components/homes/home-grocery/Hero";

import Header6 from "@/components/headers/Header6";
import Categories from "@/components/homes/home-grocery/Categories";
import Collections from "@/components/homes/home-grocery/Collections";
import Products from "@/components/homes/home-grocery/Products";
import Products2 from "@/components/homes/home-grocery/Products2";
import Features from "@/components/homes/home-grocery/Features";
import Banner from "@/components/homes/home-grocery/Banner";
import Topbar1 from "@/components/headers/Topbar1";
import Topbar2 from "@/components/headers/Topbar2";
import Topbar3 from "@/components/headers/Topbar3";
import Header17 from "@/components/headers/Header17";
import Footer2 from "@/components/footers/Footer2";
import Footer3 from "@/components/footers/Footer3";
import Footer4 from "@/components/footers/Footer4";
import Footer5 from "@/components/footers/Footer5";
import Footer6 from "@/components/footers/Footer6";
import Footer7 from "@/components/footers/Footer7";

export const metadata = {
  title: "Home Grocery || Drogaria VivaMais",
  description: "Drogaria VivaMais",
};
export default function Page() {
  return (
    <>
      <div className="color-primary-8 color-main-text-2">
        <Topbar4 />
        <Header6 />
        <Hero />
        <Categories />
        <Collections />
        <Products />
        <Products2 />
        {/* <Features />
        <Banner /> */}
        <Footer1 />
      </div>
    </>
  );
}
