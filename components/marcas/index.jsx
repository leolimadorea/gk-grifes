"use client";
import React from "react";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";

const categories = [
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
        <div className={styles.swiper}>
          <Swiper
            modules={[Navigation]}
            navigation={true}
            slidesPerView={4}
            spaceBetween={20}
            breakpoints={{
              1024: { slidesPerView: 4, spaceBetween: 3 },
              768: { slidesPerView: 3, spaceBetween: 3 },
              576: { slidesPerView: 2, spaceBetween: 3 },
              0: { slidesPerView: 1, spaceBetween: 3 },
            }}
            className={styles.brandsSwiper} // Unique class for this instance
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index} className={styles.brandsSlide}>
                <div className={styles.brandCard}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={category.image}
                      alt={category.name}
                      width={100}
                      height={100}
                      className={styles.brandImage}
                      priority={true}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Marcas;
