"use client";
import { recentItems } from "@/data/categories";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Collections() {
  return (
    <section className="flat-spacing-8 pb_0">
      <div className="container">
        <Swiper
          modules={[Pagination]}
          slidesPerView={2}
          spaceBetween={15}
          breakpoints={{
            1200: { slidesPerView: 2, spaceBetween: 30 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            0: { slidesPerView: 1, spaceBetween: 15 },
          }}
          className="tf-sw-recent"
        >
          {recentItems.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="collection-item-v4 lg hover-img">
                <div className="collection-inner">
                  <Link
                    href={`/shop-collection-sub`}
                    className="radius-20 collection-image img-style"
                  >
                    <Image
                      className="lazyload"
                      data-src={item.imgSrc}
                      alt={item.imgAlt}
                      src={item.imgSrc}
                      width={item.imgWidth}
                      height={item.imgHeight}
                    />
                  </Link>
                  <div
                    className="collection-content wow fadeInUp"
                    data-wow-delay="0s"
                  >
                    <p className="subheading">{item.subheading}</p>
                    <h5 className="heading fw-6">{item.heading}</h5>
                    <Link
                      href={`/shop-collection-sub`}
                      className="rounded-full tf-btn btn-primary-main style-3 fw-6 btn-light-icon animate-hover-btn"
                    >
                      <span>Comprar agora</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
