"use client";
import CountdownComponent from "@/components/common/Countdown";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products({ products }) {
  // Recebe products como prop
  const { setQuickViewItem } = useContextElement();
  const {
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();

  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      setCurrentImage(products[0].img);
    }
  }, [products]);

  return (
    <section className="flat-spacing-8">
      <div className="container">
        <div className="flat-title flex-row justify-content-center px-0">
          <span className="title fw-6 wow fadeInUp" data-wow-delay="0s">
            Destaques da Semana
          </span>
        </div>
        <Swiper
          className="swiper tf-sw-product-sell"
          modules={[Pagination]}
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
            el: ".p1spd",
          }}
          breakpoints={{
            1000: { slidesPerView: 3, spaceBetween: 30 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            0: { slidesPerView: 1 },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide className="swiper-slide" key={product.id}>
              <div className="card-product style-8 border-0 bg_grey-14 lg">
                <div className="card-product-wrapper">
                  <Link
                    href={`/product-detail/${product.id}`}
                    className="product-img"
                  >
                    <Image
                      className="lazyload img-product"
                      src={product.img}
                      alt="image-product"
                      width={533}
                      height={497}
                    />
                    <Image
                      className="lazyload img-hover"
                      src={product.img}
                      alt="image-hover"
                      width={533}
                      height={497}
                    />
                  </Link>

                  {product.salePercentage && (
                    <div className="on-sale-wrap text-end">
                      <div className="on-sale-item">{`${product.salePercentage}%`}</div>
                    </div>
                  )}
                </div>
                <div className="card-product-info">
                  <Link
                    href={`/product-detail/${product.id}`}
                    className="title link fw-6"
                  >
                    {product.title}
                  </Link>
                  <span className="price">
                    {product.oldPrice > 0 && (
                      <span className="old-price text_primary">
                        R${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="new-price">
                      R${product.price.toFixed(2)}
                    </span>
                  </span>

                  {/* <div className="count-down">
                    <CountdownComponent labels="Days,Hours,Mins,Secs" />
                  </div> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dots style-2 sw-pagination-product justify-content-center p1spd" />
        </Swiper>
      </div>
    </section>
  );
}
