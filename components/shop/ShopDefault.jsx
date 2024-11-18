"use client";
import { layouts } from "@/data/shop";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import ProductGrid from "./ProductGrid";
import ShopFilter from "./ShopFilter";
import Sorting from "./Sorting";

export default function ShopDefault() {
  const [gridItems, setGridItems] = useState(4);
  const [finalSorted, setFinalSorted] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`
        );
        const data = await res.json();
        setProducts(data);
        setFinalSorted(data); // Inicialmente, ordenamos os produtos recebidos.
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <section className="flat-spacing-2">
        <div className="container">
          <div className="tf-shop-control grid-3 align-items-center">
            <div className="tf-control-filter">
              <a
                href="#filterShop"
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasLeft"
                className="tf-btn-filter"
              >
                <span className="icon icon-filter" />
                <span className="text">Filter</span>
              </a>
            </div>
            <ul className="tf-control-layout d-flex justify-content-center">
              {layouts.map((layout, index) => (
                <li
                  key={index}
                  className={`tf-view-layout-switch ${layout.className} ${
                    gridItems === layout.dataValueGrid ? "active" : ""
                  }`}
                  onClick={() => setGridItems(layout.dataValueGrid)}
                >
                  <div className="item">
                    <span className={`icon ${layout.iconClass}`} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="tf-control-sorting d-flex justify-content-end">
              <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
                <Sorting setFinalSorted={setFinalSorted} products={products} />
              </div>
            </div>
          </div>
          <div className="wrapper-control-shop">
            <div className="meta-filter-shop" />
            {/* Passa os produtos para ProductGrid */}
            <ProductGrid
              allproducts={finalSorted}
              gridItems={gridItems}
              products={products}
            />
            {/* pagination */}
            {finalSorted.length ? (
              <ul className="tf-pagination-wrap tf-pagination-list tf-pagination-btn">
                <Pagination />
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      <ShopFilter setProducts={setFinalSorted} />
    </>
  );
}
