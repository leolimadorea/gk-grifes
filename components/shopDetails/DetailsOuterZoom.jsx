"use client";
import React, { useState } from "react";
import Image from "next/image";
import Quantity from "./Quantity";
import Slider1ZoomOuter from "./sliders/Slider1ZoomOuter";
import { useContextElement } from "@/context/Context";
import { openCartModal } from "@/utlis/openCartModal";

export default function DetailsOuterZoom({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null); // Track selected variant

  const {
    addProductToCart,
    isAddedToCartProducts,
    addToCompareItem,
    isAddedtoCompareItem,
    addToWishlist,
    isAddedtoWishlist,
  } = useContextElement();

  // Get price of the selected variant or fallback to range/default price
  const getPrice = () => {
    if (selectedVariant) {
      return `R$${selectedVariant.price.toFixed(2)}`;
    } else if (
      product &&
      product.productVariantValues &&
      product.productVariantValues.length > 0
    ) {
      const prices = product.productVariantValues.map((v) => v.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return minPrice === maxPrice
        ? `R$${minPrice.toFixed(2)}`
        : `R$${minPrice.toFixed(2)} - R$${maxPrice.toFixed(2)}`;
    }
    return product ? `R$${product.price.toFixed(2)}` : "Preço indisponível";
  };

  // Handle variant selection
  const handleVariantChange = (variantId) => {
    const variant = product.productVariantValues.find(
      (v) => v.id === parseInt(variantId, 10)
    );
    setSelectedVariant(variant);
  };

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
                  currentColor={product.color || "default"} // Optional color
                  productImage={product.img} // Pass product image
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

                  {/* Price */}
                  <div className="tf-product-info-price">
                    <div className="price-on-sale">{getPrice()}</div>
                  </div>

                  {/* Variant Selector */}
                  {product.productVariantValues &&
                    product.productVariantValues.length > 0 && (
                      <div className="tf-product-info-variants">
                        <div className="variant-title fw-6">
                          Escolha uma opção:
                        </div>
                        <select
                          onChange={(e) => handleVariantChange(e.target.value)}
                          className="variant-select"
                        >
                          <option value="">Selecione uma variante</option>
                          {product.productVariantValues.map((variant) => (
                            <option key={variant.id} value={variant.id}>
                              {variant.variantValue.name} - R$
                              {variant.price.toFixed(2)}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

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
                          addProductToCart(
                            {
                              id: product.id,
                              title: product.title,
                              price: selectedVariant
                                ? selectedVariant.price
                                : product.price,
                              imgSrc: product.img,
                              variant: selectedVariant
                                ? selectedVariant.variantValue.name
                                : null,
                            },
                            quantity
                          );
                        }}
                        className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                      >
                        <span>Adicionar ao carrinho - </span>
                        <span className="tf-qty-price">
                          R$
                          {(
                            (selectedVariant
                              ? selectedVariant.price
                              : product.price) * quantity
                          ).toFixed(2)}
                        </span>
                      </a>
                    </form>
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
