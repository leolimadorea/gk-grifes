import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import ShopDefault from "@/components/shop/ShopDefault";

export const metadata = {
  title: "Imuno-Pump",
  description: "VKLTech",
};

export default async function Page() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`,
    {
      cache: "no-store", // Evita o cache para garantir dados atualizados
    }
  );

  if (!res.ok) {
    // Lida com erros na resposta
    throw new Error("Falha ao buscar os produtos");
  }

  const products = await res.json();

  return (
    <>
      <Header18 />

      <ShopDefault products={products} />
      <Footer1 />
    </>
  );
}
