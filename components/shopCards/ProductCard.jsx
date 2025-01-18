"use client";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountdownComponent from "../common/Countdown";

export const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.img);
  const { setQuickViewItem } = useContextElement();
  const {
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(product.img);
  }, [product]);

  const getPriceDisplay = () => {
    if (
      product.productVariantValues &&
      product.productVariantValues.length > 0
    ) {
      const prices = product.productVariantValues.map(
        (variant) => variant.price
      );
      const lowestPrice = Math.min(...prices);
      const highestPrice = Math.max(...prices);

      if (lowestPrice === highestPrice) {
        return `$${lowestPrice.toFixed(2)}`;
      }
      return `$${lowestPrice.toFixed(2)} - $${highestPrice.toFixed(2)}`;
    }
    return `$${product.price.toFixed(2)}`;
  };

  return (
    <div className="card-product fl-item" key={product.id}>
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.id}`} className="product-img">
          <Image
            className="lazyload img-product"
            data-src={product.imgSrc}
            src={currentImage}
            alt="image-product"
            width={720}
            height={1005}
          />
          <Image
            className="lazyload img-hover"
            data-src={product.imgSrc}
            src={currentImage}
            alt="image-product"
            width={720}
            height={1005}
          />
        </Link>

        {product.countdown && (
          <div className="countdown-box">
            <div className="js-countdown">
              <CountdownComponent />
            </div>
          </div>
        )}
      </div>
      <div className="card-product-info">
        <Link href={`/product-detail/${product.id}`} className="title link">
          {product.title}
        </Link>
        <span className="price">{getPriceDisplay()}</span>
      </div>
    </div>
  );
};
