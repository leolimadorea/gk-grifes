"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import CartSidebar from "../common/CartSidebar";

const Header13 = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories/getAll");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();

    // Add click outside listener to close search results
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    // Debounce search to avoid too many requests
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}`
        );
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        setSearchResults(data);
        setShowResults(true);
      } catch (error) {
        console.error("Error searching products:", error);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const toggleCart = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <header className={styles.headerWrapper}>
        <div className={styles.headerContainer}>
          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
          >
            <div className={styles.hamburgerIcon}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* Logo */}
          <div className={styles.logo}>
            <Link href="/">
              <Image
                src="/images/gkgrifes.png"
                alt="GK Grifes"
                width={100}
                height={50}
                priority
              />
            </Link>
          </div>

          {/* Cart Icon for Mobile */}
          <button onClick={toggleCart} className={styles.mobileCartButton}>
            <Image
              src="/images/cart.svg"
              alt="Carrinho"
              width={24}
              height={24}
              className={styles.whiteIcon}
            />
            <span className={styles.cartCount}>0</span>
          </button>

          {/* Desktop Elements */}
          <div className={styles.desktopOnly}>
            {/* Search Bar */}
            <div className={styles.searchBar} ref={searchRef}>
              <input
                type="text"
                placeholder="Buscar"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
              />
              <button>
                <Image
                  src="/images/buscar.svg"
                  alt="Search"
                  width={24}
                  height={24}
                />
              </button>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className={styles.searchResultsDropdown}>
                  {searchResults.map((product) => (
                    <Link
                      href={`/product/${product.id}`}
                      key={product.id}
                      onClick={() => setShowResults(false)}
                      className={styles.searchResultItem}
                    >
                      {product.img && (
                        <Image
                          src={product.img}
                          alt={product.title}
                          width={40}
                          height={40}
                        />
                      )}
                      <div className={styles.productInfo}>
                        <span className={styles.productTitle}>
                          {product.title}
                        </span>
                        <span className={styles.productPrice}>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(product.price)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* User Icons */}
            <div className={styles.userIcons}>
              {/* <Link href="/my-account">
                <Image
                  src="/images/user.svg"
                  alt="Minha Conta"
                  width={24}
                  height={24}
                  className={styles.whiteIcon}
                />
              </Link> */}
              <button onClick={toggleCart} className={styles.cartButton}>
                <Image
                  src="/images/cart.svg"
                  alt="Carrinho"
                  width={24}
                  height={24}
                  className={styles.whiteIcon}
                />
                <span className={styles.cartCount}>0</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className={styles.mobileSearchBar} ref={searchRef}>
          <input
            type="text"
            placeholder="Buscar"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
          />
          <button>
            <Image
              src="/images/buscar.svg"
              alt="Search"
              width={24}
              height={24}
            />
          </button>

          {/* Mobile Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className={styles.mobileSearchResultsDropdown}>
              {searchResults.map((product) => (
                <Link
                  href={`/product/${product.id}`}
                  key={product.id}
                  onClick={() => setShowResults(false)}
                  className={styles.searchResultItem}
                >
                  {product.img && (
                    <Image
                      src={product.img}
                      alt={product.title}
                      width={40}
                      height={40}
                    />
                  )}
                  <div className={styles.productInfo}>
                    <span className={styles.productTitle}>{product.title}</span>
                    <span className={styles.productPrice}>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
      >
        <div className={styles.mobileMenuHeader}>
          <button onClick={toggleMobileMenu} className={styles.closeButton}>
            <div className={styles.closeIcon}>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
        <nav className={styles.mobileNav}>
          <ul>
            {isLoading ? (
              <li>Carregando...</li>
            ) : (
              categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.slug}`}
                    onClick={toggleMobileMenu}
                  >
                    {category.name}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </nav>
      </div>

      {/* Desktop Navigation */}
      <nav className={`${styles.navWrapper} ${styles.desktopOnly}`}>
        <div className={styles.navContainer}>
          <ul>
            {isLoading ? (
              <li>Carregando...</li>
            ) : (
              categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.slug}`}>
                    {category.name}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </nav>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </>
  );
};

export default Header13;
