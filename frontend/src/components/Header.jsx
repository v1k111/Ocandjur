import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo-ocandjur.jpg";
import { useCart } from "../context/CartContext";

function Header() {
  const { items, cartItems } = useCart();
  const [bump, setBump] = useState(false);

  const rawItems = items || cartItems || [];
  const cartCount = Array.isArray(rawItems)
    ? rawItems.reduce(
        (sum, item) => sum + (item?.quantity != null ? item.quantity : 1),
        0
      )
    : 0;

  useEffect(() => {
    function handleBump() {
      setBump(true);
      setTimeout(() => setBump(false), 350);
    }
    window.addEventListener("ocandjur-cart-bump", handleBump);
    return () => {
      window.removeEventListener("ocandjur-cart-bump", handleBump);
    };
  }, []);

  return (
    <header>
      <div className="header-main">
        <div className="header-logo">
          <img src={logo} alt="Ocandjur logo" className="logo-image" />
        </div>
        <nav className="header-nav">
          <NavLink to="/" end>
            Магазин
          </NavLink>
          <NavLink to="/about">Про бренд</NavLink>
          <NavLink to="/contact">Контакти</NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              "header-cart-link" +
              (isActive ? " active" : "") +
              (bump ? " header-cart-link--bump" : "")
            }
          >
            Кошик{cartCount > 0 ? ` (${cartCount})` : ""}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
