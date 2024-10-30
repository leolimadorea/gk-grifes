"use client";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

export default function Slider1ZoomOuter({ productImage }) {
  return (
    <>
      <Gallery>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="tf-product-media-main"
          id="gallery-swiper-started"
          modules={[Thumbs, Navigation]}
        >
          <SwiperSlide>
            <Item
              original={productImage}
              thumbnail={productImage}
              width={500}
              height={500}
            >
              {({ ref, open }) => (
                <a className="item" onClick={open}>
                  <Image
                    className="tf-image"
                    ref={ref}
                    alt="Produto"
                    width={500}
                    height={500}
                    src={productImage}
                  />
                </a>
              )}
            </Item>
          </SwiperSlide>

          {/* Navigation buttons */}
          <div className="swiper-button-next button-style-arrow thumbs-next"></div>
          <div className="swiper-button-prev button-style-arrow thumbs-prev"></div>
        </Swiper>
      </Gallery>
    </>
  );
}
