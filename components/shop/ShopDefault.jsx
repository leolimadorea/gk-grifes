"use client";
import { layouts } from "@/data/shop";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import ProductGrid from "./ProductGrid";
import ShopFilter from "./ShopFilter";

export default function ShopDefault({ filteredProducts }) {
  const [gridItems, setGridItems] = useState(4);
  const [products, setProducts] = useState(filteredProducts);
  const [finalSorted, setFinalSorted] = useState(filteredProducts);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Atualiza produtos apenas se `filteredProducts` mudar
    setProducts(filteredProducts);
    setFinalSorted(filteredProducts);
  }, [filteredProducts]);

  useEffect(() => {
    // Aplica o filtro de pesquisa
    const applyFilter = () => {
      if (searchQuery.trim() === "") {
        setProducts(filteredProducts);
        setFinalSorted(filteredProducts);
      } else {
        const filtered = products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFinalSorted(filtered);
        setProducts(filtered);
      }
    };
    applyFilter();
  }, [searchQuery, products]); // `products` muda quando `filteredProducts` muda

  console.log(products);

  return (
    <>
      <section className="flat-spacing-2">
        <div className="container">
          <div className="tf-shop-control grid-3 align-items-center">
            <div className="tf-control-filter">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="tf-mini-search-frm"
              >
                <fieldset className="text">
                  <input
                    type="text"
                    placeholder="Pesquisar produtos..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-required="true"
                    required
                  />
                </fieldset>
                <button className="" type="submit">
                  <i className="icon-search" />
                </button>
              </form>
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
          </div>
          <div className="wrapper-control-shop">
            <ProductGrid
              allproducts={finalSorted}
              gridItems={gridItems}
              products={products}
            />
            {/* Paginação */}
            {finalSorted?.length ? (
              <ul className="tf-pagination-wrap tf-pagination-list tf-pagination-btn">
                <Pagination />
              </ul>
            ) : (
              <p className="text-center">Nenhum produto encontrado.</p>
            )}
          </div>
        </div>
      </section>
      <ShopFilter setProducts={setFinalSorted} />
    </>
  );
}
