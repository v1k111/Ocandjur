import React from "react";
import logo from "../assets/logo-ocandjur.jpg";

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        {/* Логотип + опис */}
        <div className="footer-col footer-brand">
          <div className="footer-logo-row">
            <img src={logo} alt="Ocandjur logo" className="footer-logo-image" />
            <span className="footer-logo-text">Ocandjur</span>
          </div>
          <p>Ароматичні свічки у темній вогняній естетиці.</p>
        </div>

        {/* Колонка: покупцям */}
        <div className="footer-col">
          <h4>Покупцям</h4>
          <p>Доставка та оплата</p>
          <p>Пункти видачі</p>
          <p>Магазини</p>
          <p>Повернення товарів</p>
        </div>

        {/* Колонка: компанія */}
        <div className="footer-col">
          <h4>Компанія</h4>
          <p>Про бренд</p>
          <p>Корпоративним клієнтам</p>
          <p>Статті</p>
        </div>

        {/* Колонка: контакти */}
        <div className="footer-col footer-contacts">
          <h4>Контакти</h4>
          <p>+7 (999) 123‑45‑67</p>
          <p>info@ocandjur.com</p>
          <p>м. Київ, вул. Нічна, 13</p>
          <div className="footer-socials">
            <span>IG</span>
            <span>FB</span>
            <span>YT</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom-line" />
      <p className="footer-copy">© 2025 Ocandjur</p>
    </footer>
  );
}

export default Footer;
