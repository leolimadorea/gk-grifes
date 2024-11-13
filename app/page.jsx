import Footer1 from "@/components/footers/Footer1";
import Header6 from "@/components/headers/Header6";

import Marquee from "@/components/homes/home-1/Marquee";
import Hero from "@/components/homes/home-grocery/Hero";
import Section1 from "@/components/imuno/Section1";
import Section2 from "@/components/imuno/Section2";
import Section3 from "@/components/imuno/Section3";
import Section4 from "@/components/imuno/Section4";
import Section5 from "@/components/imuno/Section5";
import Section6 from "@/components/imuno/Section6";

export const metadata = {
  title: "Drogaria VivaMais",
};
export default async function Page() {
  let products = [];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`
  );
  products = await res.json();

  return (
    <>
      <div className="color-primary-8 color-main-text-2">
        <Header6 />
        <Hero />
        <Marquee />
        <Section1 />
        <Section2 products={products} />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Footer1 />
      </div>
    </>
  );
}
