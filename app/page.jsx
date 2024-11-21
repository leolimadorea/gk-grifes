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

export default async function Page() {
  // Realizando a chamada à API diretamente do backend para o frontend
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`, {
    cache: "no-store", // Evita cache para obter dados atualizados sempre
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar os produtos");
  }

  const products = await res.json();
  const session = await getServerSession(authOptions);

  return (
    <div className="color-primary-8 color-main-text-2">
      <Header18 />
      <Hero />
      <Slider />
      <Collections />
      <Products products={products} />
      <Products2 products={products} />
      <Footer1 />
    </div>
  );
}
