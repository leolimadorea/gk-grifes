"use client";
import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const categories = [
  { name: "Balenciaga", image: "/images/brand/frame3.png" },
  { name: "Armani", image: "/images/brand/frame4.png" },
  { name: "Diesel", image: "/images/brand/frame5.png" },
  { name: "Hugo Boss", image: "/images/brand/frame6.png" },
  { name: "Gucci", image: "/images/brand/frame7.png" },
  { name: "Balenciaga", image: "/images/brand/frame3.png" },
  { name: "Armani", image: "/images/brand/frame4.png" },
  { name: "Diesel", image: "/images/brand/frame5.png" },
  { name: "Hugo Boss", image: "/images/brand/frame6.png" },
  { name: "Gucci", image: "/images/brand/frame7.png" },
];

const Marcas = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h3>As melhores marcas!</h3>
        </div>
        <div className={styles.marqueeWrapper}>
          <div className={styles.marquee}>
            {[...categories, ...categories].map((category, index) => (
              <div key={index} className={styles.brandCard}>
                <div className={styles.imageWrapper}>
                  <img
                    src={category.image}
                    alt={category.name}
                    width={100}
                    height={100}
                    className={styles.brandImage}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marcas;
