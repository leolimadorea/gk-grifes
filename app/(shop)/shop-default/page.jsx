import Footer1 from "@/components/footers/Footer1";
import Header18 from "@/components/headers/Header18";
import ShopDefault from "@/components/shop/ShopDefault";

export const metadata = {
  title: "Drogaria VivaMais",
  description: "Drogaria VivaMais",
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
    <div className="color-primary-8 color-main-text-2">
      <Header18 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center"></div>
        </div>
      </div>
      <ShopDefault products={products} />
      <Footer1 />
    </div>
  );
}
