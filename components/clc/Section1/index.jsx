"use client";

import { useEffect } from "react";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function Section1() {
  useEffect(() => {
    // Forçar atualização do Swiper após a montagem do componente
    const updateSwiper = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);

    return () => clearTimeout(updateSwiper);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.block}>
          <h1>Encontre seu estilo único!</h1>
          <h4>
            Na GK GRIFES transformamos tendências em looks incríveis. Aproveite
            ofertas exclusivas e eleve seu guarda-roupa agora mesmo.
          </h4>
          <button>@GKGRIFES</button>
        </div>
        <div className={styles.image}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            className="banner-swiper"
          >
            <SwiperSlide>
              <img src="/images/camisas-premium.png" alt="Conjunto Nike" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/air-max-tn.png" alt="Nike Air Max TN" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/camisas.png" alt="Camisas Premium" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/calcas-jeans.png" alt="Calças Jeans" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/moletons.premium.png" alt="Calças Jeans" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
