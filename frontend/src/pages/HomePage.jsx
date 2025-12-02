import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CatalogSection from "../components/CatalogSection";

const PRODUCTS = [
  {
    id: 1,
    name: "Свічка «Нічна Лаванда»",
    price: 790,
    image: "/src/assets/candle1.jpg",
    tag: "new",
  },
  {
    id: 2,
    name: "Свічка «Ванільний Вогонь»",
    price: 890,
    image: "/src/assets/candle2.jpg",
    tag: "bestseller",
  },
  {
    id: 3,
    name: "Свічка «Цитрусовий Світанок»",
    price: 850,
    image: "/src/assets/candle3.jpg",
    tag: "hot",
  },
  {
    id: 4,
    name: "Свічка «Темний Ліс»",
    price: 920,
    image: "/src/assets/candle4.jpg",
    tag: "new",
  },
];

const COLLECTIONS = [
  { title: "Для дому", image: "/src/assets/collection-home.jpg" },
  { title: "Подарункові набори", image: "/src/assets/collection-gift.jpg" },
  { title: "Нічні аромати", image: "/src/assets/collection-night.jpg" },
];

const NEWS = [
  {
    title: "Знижка до 20% на набір «Вечірній вогонь»",
    date: "11.03.2025",
    image: "/src/assets/news1.jpg",
  },
  {
    title: "Як обрати аромат свічки для спальні",
    date: "06.03.2025",
    image: "/src/assets/news2.jpg",
  },
  {
    title: "Ocandjur на маркеті локальних брендів",
    date: "03.03.2025",
    image: "/src/assets/news3.jpg",
  },
  {
    title: "Нова колекція «Нічне місто»",
    date: "01.03.2025",
    image: "/src/assets/news4.jpg",
  },
];

function HomePage() {
  const [activeTab, setActiveTab] = useState("new");
  const { addToCart } = useCart();

  const filteredProducts = PRODUCTS.filter((p) =>
    activeTab === "all" ? true : p.tag === activeTab
  );

  const handleAddToCartShowAnim = (product) => {
    addToCart(product);
    window.dispatchEvent(new Event("ocandjur-cart-bump"));
  };

  return (
    <>
      <Header />

      <main>
        <section className="loft-hero">
          <div className="loft-hero-main">
            <div className="loft-hero-image loft-hero-image--big">
              <div className="loft-hero-text">
                <h1>Спеціальна пропозиція для нових клієнтів</h1>
                <p>
                  Замов набір свічок Ocandjur і отримай знижку 15% на наступне
                  замовлення.
                </p>
              </div>
            </div>
          </div>
          <div className="loft-hero-side">
            <div className="loft-hero-image loft-hero-image--small">
              <span>Декор для дому</span>
            </div>
            <div className="loft-hero-image loft-hero-image--small">
              <span>Ароматичні свічки</span>
            </div>
          </div>
        </section>

        <section className="loft-products">
          <div className="loft-tabs">
            <button
              className={
                "loft-tab" + (activeTab === "new" ? " loft-tab--active" : "")
              }
              onClick={() => setActiveTab("new")}
            >
              Новинки
            </button>
            <button
              className={
                "loft-tab" +
                (activeTab === "bestseller" ? " loft-tab--active" : "")
              }
              onClick={() => setActiveTab("bestseller")}
            >
              Бестселери
            </button>
            <button
              className={
                "loft-tab" + (activeTab === "hot" ? " loft-tab--active" : "")
              }
              onClick={() => setActiveTab("hot")}
            >
              Гаряча ціна
            </button>
          </div>

          <div className="loft-grid">
            {filteredProducts.map((p) => (
              <div key={p.id} className="loft-product-card">
                <img src={p.image} alt={p.name} />
                <p className="loft-product-name">{p.name}</p>
                <p className="loft-product-price">{p.price} ₴</p>
                <button
                  className="loft-product-button"
                  type="button"
                  onClick={() => handleAddToCartShowAnim(p)}
                >
                  До кошика
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="loft-collections">
          <h2>Нові колекції</h2>
          <div className="loft-collections-grid">
            {COLLECTIONS.map((c) => (
              <div key={c.title} className="loft-collection-card">
                <img src={c.image} alt={c.title} />
                <p>{c.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="advantages">
          <h2>Наші переваги</h2>
          <div className="advantages-grid">
            <div className="adv-card">
              <h3>Широкий асортимент</h3>
              <p>
                Від мінімалістичних до складних композицій — під будь‑який
                настрій та інтерʼєр.
              </p>
            </div>
            <div className="adv-card">
              <h3>Найкращі ціни</h3>
              <p>
                Працюємо напряму з постачальниками воску та ароматів, без
                зайвих націнок.
              </p>
            </div>
            <div className="adv-card">
              <h3>Контроль якості</h3>
              <p>
                Тестуємо час горіння, аромат і рівномірність полумʼя кожної
                свічки.
              </p>
            </div>
            <div className="adv-card">
              <h3>Знижки та подарунки</h3>
              <p>
                Акції, сезонні набори та програма лояльності для постійних
                клієнтів.
              </p>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>Відгуки клієнтів</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                “Свічка «Нічна Лаванда» створює ідеальну атмосферу перед сном.
                Аромат мʼякий і не навʼязливий.”
              </p>
              <p className="testimonial-name">— Ігор</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                “Гості постійно питають, звідки ці свічки. Дуже стильний дизайн
                та приємне світло.”
              </p>
              <p className="testimonial-name">— Світлана</p>
            </div>
          </div>
        </section>

        <section className="news-and-feedback">
          <div className="news">
            <h2>Новини та акції</h2>
            <div className="news-list">
              {NEWS.map((n) => (
                <div key={n.title} className="news-card">
                  <img src={n.image} alt={n.title} />
                  <p className="news-title">{n.title}</p>
                  <p className="news-date">{n.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="feedback">
            <h2>Зворотний зв'язок</h2>
            <form
              className="feedback-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Дякуємо за звернення! Ми відповімо найближчим часом.");
              }}
            >
              <input placeholder="Ім'я*" />
              <input placeholder="Телефон" />
              <input placeholder="E-mail*" type="email" />
              <textarea placeholder="Коментар" />
              <label className="feedback-check">
                <input type="checkbox" /> Підтверджую, що ознайомлений(а) з
                умовами оферти та політикою конфіденційності
              </label>
              <button type="submit">Надіслати</button>
            </form>
          </div>
        </section>

        <CatalogSection />
      </main>

      <Footer />
    </>
  );
}

export default HomePage;
