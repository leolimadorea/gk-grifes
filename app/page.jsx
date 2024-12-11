import Footer1 from "@/components/footers/Footer1";
import Hero from "@/components/homes/home-grocery/Hero";
import Header18 from "@/components/headers/Header18";
import Categories from "@/components/homes/home-grocery/Categories";
import Collections from "@/components/homes/home-grocery/Collections";
import Products from "@/components/homes/home-grocery/Products";
import Products2 from "@/components/homes/home-grocery/Products2";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Slider from "@/components/slider";

export const metadata = {
  title: "Paty Girls",
};

export const revalidate = 0;

export default async function Page() {
  // Fetching products
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`,
    {
      cache: "no-store", // Ensure fresh data
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar os produtos");
  }

  const products = await res.json();
  console.log("Number of products fetched:", products.length);

  // Log details of each product
  products.forEach((product, index) => {
    console.log(`Product #${index + 1}:`, product);
  });

  const session = await getServerSession(authOptions);

  console.log("Session info:", session);

  return (
    <div className="color-primary-8 color-main-text-2">
      <Header18 />
      <Hero />
      <Slider />
      <Collections />
      <Products products={products} />
      {/* <Products2 products={products} /> */}
      <Footer1 />
    </div>
  );
}
