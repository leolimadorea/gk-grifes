"use client";
import React, { useState } from "react";
import Image from "next/image";
import { colors, paymentImages } from "@/data/singleProductOptions";
import Quantity from "./Quantity";
import Slider1ZoomOuter from "./sliders/Slider1ZoomOuter";
import { useContextElement } from "@/context/Context";
import { openCartModal } from "@/utlis/openCartModal";

export default function DetailsOuterZoom({ product }) {
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);

  const handleColor = (color) => {
    const updatedColor = colors.find(
      (elm) => elm.value.toLowerCase() === color.toLowerCase()
    );
    if (updatedColor) {
      setCurrentColor(updatedColor);
    }
  };

  const {
    addProductToCart,
    isAddedToCartProducts,
    addToCompareItem,
    isAddedtoCompareItem,
    addToWishlist,
    isAddedtoWishlist,
  } = useContextElement();

  return (
    <section
      className="flat-spacing-4 pt_0"
      style={{ maxWidth: "100vw", overflow: "clip" }}
    >
      <div
        className="tf-main-product section-image-zoom"
        style={{ maxWidth: "100vw", overflow: "clip" }}
      >
        <div className="container">
          <div className="row">
            {/* Image Slider */}
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <Slider1ZoomOuter
                  handleColor={handleColor}
                  currentColor={currentColor.value}
                  productImage={product.img} // Passa a imagem do produto
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative">
                <div className="tf-product-info-list other-image-zoom">
                  {/* Title */}
                  <div className="tf-product-info-title">
                    <h5>{product.title || "Produto Padrão"}</h5>
                  </div>

                  {/* Badges */}
                  <div className="tf-product-info-badges">
                    <div className="badges">Mais vendido</div>
                    <div className="product-status-content">
                      <i className="icon-lightning" />
                      <p className="fw-6">
                        Vendendo rápido! 56 pessoas têm isso em seus carrinhos.
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="tf-product-info-price">
                    <div className="price-on-sale">
                      R${product.price.toFixed(2)}
                    </div>
                    {product.oldPrice && (
                      <div className="compare-at-price">
                        R${product.oldPrice.toFixed(2)}
                      </div>
                    )}
                  </div>

                  {/* Quantity Selector */}
                  <div className="tf-product-info-quantity">
                    <div className="quantity-title fw-6">Quantidade</div>
                    <Quantity setQuantity={setQuantity} />
                  </div>

                  {/* Buy Button */}
                  <div className="tf-product-info-buy-button">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <a
                        onClick={() => {
                          openCartModal();
                          addProductToCart(product.id);
                        }}
                        className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                      >
                        <span>Adicionar ao carrinho - </span>
                        <span className="tf-qty-price">
                          R${(product.price * quantity).toFixed(2)}
                        </span>
                      </a>
                    </form>
                  </div>

                  {/* Delivery and Return Information */}
                  <div className="tf-product-info-delivery-return">
                    <div className="row">
                      <div className="col-xl-6 col-12">
                        <p>
                          Estimativa de entrega:{" "}
                          <span className="fw-7">3-6 dias</span>
                        </p>
                      </div>
                      <div className="col-xl-6 col-12">
                        <p>
                          Devolução em até <span className="fw-7">30 dias</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Trust Seal */}
                  <div className="tf-product-info-trust-seal">
                    <p className="fw-6">Compra Segura Garantida</p>
                    <div className="tf-payment">
                      {paymentImages.map((image, index) => (
                        <Image
                          key={index}
                          alt={image.alt}
                          src={image.src}
                          width={image.width}
                          height={image.height}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
