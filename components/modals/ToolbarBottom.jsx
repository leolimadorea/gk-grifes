import React from "react";
import Link from "next/link";
import CartLength from "../common/CartLength";
import WishlistLength from "../common/WishlistLength";
export default function ToolbarBottom() {
  return (
    <div className="tf-toolbar-bottom type-1150">
      <div className="toolbar-item">
        <a href="#shoppingCart" data-bs-toggle="modal">
          <div className="toolbar-icon">
            <i className="icon-bag" />
            <div className="toolbar-count">
              <CartLength />
            </div>
          </div>
          <div className="toolbar-label">Carrinho</div>
        </a>
      </div>
    </div>
  );
}
