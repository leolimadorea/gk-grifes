"use client";
import { useContextElement } from "@/context/Context";
import { products15 } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products({ products }) {
  const router = useRouter();

  const handleProductClick = (id) => {
    router.push(`/product-detail/${id}`);
  };
  const {
    setQuickViewItem,
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();

  return (
    <section className="flat-spacing-19">
      <div className="container">
        <div className="flat-title flex-row justify-content-between px-0">
          <span className="title wow fadeInUp" data-wow-delay="0s">
            Produtos
          </span>
          <div className="box-sw-navigation">
            <div className="nav-sw square nav-next-slider nav-next-sell-1 snbp161">
              <span className="icon icon-arrow1-left" />
            </div>
            <div className="nav-sw square nav-prev-slider nav-prev-sell-1 snbn161">
              <span className="icon icon-arrow1-right" />
            </div>
          </div>
        </div>
        <div className="hover-sw-nav hover-sw-2">
          <div className="swiper tf-sw-product-sell-1 wrap-sw-over">
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              breakpoints={{
                1100: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 3,
                },

                640: {
                  slidesPerView: 2,
                },
                0: {
                  slidesPerView: 2,
                },
              }}
              className="swiper-wrapper"
              modules={[Navigation]}
              navigation={{
                prevEl: ".snbp161",
                nextEl: ".snbn161",
              }}
            >
              {products.map((product, index) => (
                <SwiperSlide className="swiper-slide height-auto" key={index}>
                  <div className="card-product overflow-hidden bg_white radius-20 border-line h-100">
                    <div className="card-product-wrapper">
                      <Link
                        href={`/product-detail/${product.id}`}
                        className="product-img"
                      >
                        <Image
                          className="lazyload img-product"
                          src={product.img}
                          alt="image-product"
                          width={360}
                          height={360}
                        />
                        <Image
                          className="lazyload img-hover"
                          src={product.img}
                          alt="image-product"
                          width={360}
                          height={360}
                        />
                      </Link>
                    </div>
                    <div className="card-product-info has-padding">
                      <Link
                        href={`/product-detail/${product.id}`}
                        className="title link"
                      >
                        {product.title}
                      </Link>

                      <span className="price">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
