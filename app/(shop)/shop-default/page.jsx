import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
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
      <Header2 />

      <ShopDefault products={products} />
      <Footer2 />
    </>
  );
}
