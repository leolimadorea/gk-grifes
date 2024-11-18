import { ProductCard } from "../shopCards/ProductCard";

export default function ProductGrid({ gridItems = 4, allproducts, products }) {
  return (
    <>
      <div
        style={{
          width: "fit-content",
          margin: "0  auto",
          fontSize: "17px",
          marginBottom: "24px",
        }}
      >
        {products.length} produtos
      </div>
      <div className={`grid-layout wrapper-shop grid-${gridItems}`}>
        {products.map((product, i) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}
