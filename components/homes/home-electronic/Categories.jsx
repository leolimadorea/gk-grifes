"use client";
import { collectionItems } from "@/data/categories";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Categories({ categories }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/shop-default");
  };
  return (
    <section className="flat-spacing-11 pb-0">
      <div className="container">
        <div className="position-relative">
          <div className="flat-title flex-row justify-content-between px-0">
            <span className="title wow fadeInUp" data-wow-delay="0s">
              Comprar por categoria
            </span>
          </div>
          <div className="sw-pagination-wrapper">
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              breakpoints={{
                1200: { slidesPerView: 4 },
                992: { slidesPerView: 4 },
                768: { slidesPerView: 3 },
                0: { slidesPerView: 1 },
              }}
              loop={false}
              autoplay={false}
              className="tf-sw-collection"
              modules={[Pagination]}
              pagination={{ clickable: true, el: ".spd159" }}
            >
              {categories.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="collection-item-v2 type-small hover-img">
                    <Link
                      href={`/shop-collection-sub`}
                      className="collection-inner"
                    >
                      <div className="collection-image img-style radius-10">
                        <Image
                          className="lazyload"
                          data-src={item.imageUrl}
                          alt="PRODUTO"
                          src={item.imageUrl}
                          width={320}
                          height={340}
                        />
                      </div>
                      <div className="collection-content">
                        <div className="top">
                          <h5 className="heading fw-5">{item.name}</h5>
                          {/* <p className="subheading">
                            <span>{item.itemCount}</span>
                          </p> */}
                        </div>
                        <div className="bottom">
                          <button
                            className="tf-btn collection-title hover-icon btn-light rounded-full"
                            onClick={handleClick}
                          >
                            <span>Comprar agora</span>
                            <i className="icon icon-arrow1-top-left" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="box-sw-navigation">
              <div className="sw-dots style-2 medium sw-pagination-collection justify-content-center spd159" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
