import Testimonials from "@/components/common/Testimonials";
import Topbar1 from "@/components/headers/Topbar1";
import Categories from "@/components/homes/home-electronic/Categories";
import Products from "@/components/homes/home-electronic/Products";

import Features from "@/components/common/Features2";
import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import Hero from "@/components/homes/home-1/Hero";
import Marquee from "@/components/homes/home-1/Marquee";
import CollectionBanner from "@/components/homes/home-electronic/CollectionBanner";
import Collections from "@/components/homes/home-electronic/Collections";

export const metadata = {
  title: "ImunoPump",
};
export default async function Page() {
  let products = [];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`
  );
  products = await res.json();
  let categories = [];

  const res2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`
  );
  categories = await res2.json();

  console.log("categories", categories);
  return (
    <>
      <div className="color-primary-8 color-main-text-2">
        <Topbar1 />
        <Header2 />
        <Hero />
        <Marquee />
        <Categories categories={categories} />
        {/* <Section2 products={products} /> */}

        <CollectionBanner />
        <Collections />
        <Products products={products} />
        <Testimonials />
        {/* <Brands /> */}

        <Features />
        <Footer2 />
      </div>
    </>
  );
}
