import Footer1 from "@/components/footers/Footer1";
import Hero from "@/components/homes/home-grocery/Hero";
import Products from "@/components/homes/home-grocery/Products";
import Products2 from "@/components/homes/home-grocery/Products2";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Slider from "@/components/slider";
import Header5 from "@/components/headers/Header2";
import Section1 from "@/components/clc/Section1";
import Section2 from "@/components/clc/Section2";
import Section3 from "@/components/clc/Section3";
import Section4 from "@/components/clc/Section4";
import WhatsAppButton from "@/components/clc/Whats/WhatsAppButton";
import Header2 from "@/components/headers/Header2";
import Header3 from "@/components/headers/Header3";
import Header15 from "@/components/headers/Header15";
import Header10 from "@/components/headers/Header10";
import Header7 from "@/components/headers/Header7";
import Header18 from "@/components/headers/Header18";
import Header13 from "@/components/headers/Header13";
import MovingBars from "@/components/clc/Movingbars";
import Header12 from "@/components/headers/Header12";
import Header11 from "@/components/headers/Header11";
import Header1 from "@/components/headers/Header1";

export const metadata = {
  title: "GK - GRIFESS",
};

export const revalidate = 0;

export default async function Page() {
  // Fetching products
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar os produtos");
  }

  const products = await res.json();
  console.log("Number of products fetched:", products.length);

  const session = await getServerSession(authOptions);

  console.log("Session info:", session);

  return (
    <div className="color-primary-8 color-main-text-2">
      <Header13 />
      <Section1 />
      <Section2 />
      <Products products={products} />
      <Section3 />
      <Products2 products={products} />
      <Section4 />
      <MovingBars />
      <Footer1 />
      <WhatsAppButton />
    </div>
  );
}
