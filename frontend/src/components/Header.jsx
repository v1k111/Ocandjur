import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-ocandjur.jpg";

function Header() {
  return (
    <header>
      <div className="header">
        <img src={logo} alt="Логотип Ocandjur" className="logo-image" />
      </div>
      <nav>
        <Link to="/">Магазин</Link>
        <Link to="/about">Про бренд</Link>
        <Link to="/contact">Контакти</Link>
        <Link to="/cart">Кошик</Link>
      </nav>
    </header>
  );
}

export default Header;
