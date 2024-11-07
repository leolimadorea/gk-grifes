"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "../shopCards/ProductCard";

export default function RecentProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data.slice(4, 12));
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="flat-spacing-4 pt_0">
      <div className="container">
        <div className="flat-title">
          <span className="title">Visualizações Recentes</span>
        </div>
        <div className="hover-sw-nav hover-sw-2">
          <Swiper
            className="swiper tf-sw-product-sell wrap-sw-over"
            slidesPerView={4}
            spaceBetween={30}
            breakpoints={{
              1024: {
                slidesPerView: 4,
              },
              640: {
                slidesPerView: 3,
              },
              0: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
            }}
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".snbp308",
              nextEl: ".snbn308",
            }}
            pagination={{ clickable: true, el: ".spd308" }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="swiper-slide">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="nav-sw nav-next-slider nav-next-recent box-icon w_46 round snbp308">
            <span className="icon icon-arrow-left" />
          </div>
          <div className="nav-sw nav-prev-slider nav-prev-recent box-icon w_46 round snbn308">
            <span className="icon icon-arrow-right" />
          </div>
          <div className="sw-dots style-2 sw-pagination-recent justify-content-center spd308" />
        </div>
      </div>
    </section>
  );
}
