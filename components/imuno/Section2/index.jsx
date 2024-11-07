"use client";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

export default function Section2({ products }) {
  const router = useRouter();

  const handleProductClick = (id) => {
    router.push(`/product-detail/${id}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className={styles.card}
              onClick={() => handleProductClick(product.id)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.image}>
                <img src={product.img} alt={product.title} />
              </div>
              <div className={styles.bottom}>
                <p>⭐⭐⭐⭐⭐</p>
                <h4>{product.title}</h4>
                <p>R$ {product.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum produto disponível.</p>
        )}
      </div>
    </div>
  );
}
