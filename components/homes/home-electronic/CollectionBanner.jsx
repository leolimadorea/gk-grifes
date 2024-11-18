import Image from "next/image";
import Link from "next/link";
export default function CollectionBanner() {
  return (
    <section className="flat-spacing-8 pb_0">
      <div className="container">
        <div className="tf-banner-collection">
          <Image
            className="lazyload"
            data-src="/images/collections/banner-collection-3.jpg"
            alt="img-banner"
            loading="lazy"
            src="/images/collections/banner-collection-3.jpg"
            width={1400}
            height={532}
          />
          <div className="box-content">
            <div className="container wow fadeInUp" data-wow-delay="0s">
              <div className="sub fw-7 text_white">
                PROMOÇÃO DE ATÉ 30% OFF HOJE
              </div>
              <h2 className="heading fw-6 text_white">
                Melhores Ofertas e Descontos
              </h2>
              <p className="text_white">
                Carregamento sem fio rápido onde quer que esteja.
              </p>
              <Link
                href={`/shop-default`}
                className="rounded-full tf-btn btn-primary-main style-3 fw-6 btn-light-icon animate-hover-btn"
              >
                <span>Ver Coleção</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
