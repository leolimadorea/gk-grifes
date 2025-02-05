import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import FilterSidebar from "@/components/shop/FilterSidebar";

export const metadata = {
  title: "Shop Filter Sidebar || CLC",
  description: "CLC",
};

export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Page() {
  const products = await getProducts();

  return (
    <>
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">New Arrival</div>
          <p className="text-center text-2 text_black-2 mt_5">
            Shop through our latest selection of Fashion
          </p>
        </div>
      </div>
      <FilterSidebar products={products} />
      <Footer1 />
    </>
  );
}
