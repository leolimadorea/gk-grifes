import React from "react";
import Image from "next/image";
export default function Hero() {
  return (
    <section className="tf-slideshow about-us-page position-relative">
      <div className="banner-wrapper">
        <Image
          className="lazyload"
          src="https://firebasestorage.googleapis.com/v0/b/bb-queue.appspot.com/o/chimney-roof.jpg?alt=media&token=655c8404-76fd-4592-840b-227871c44d93"
          data-=""
          alt="image-collection"
          width={2000}
          height={1262}
        />
        <div className="box-content text-center">
          <div className="container">
            <div className="text text-white">CLC CHAMINÉS</div>
          </div>
        </div>
      </div>
    </section>
  );
}
