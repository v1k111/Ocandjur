import React, { useEffect, useMemo, useState } from "react";
import { API_URL } from "../api/config";
import { useCart } from "../context/CartContext";

const PER_PAGE = 9;

function CatalogSection() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [tagFilters, setTagFilters] = useState({
    new: false,
    bestseller: false,
    hot: false,
  });
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) {
          throw new Error("Не вдалося завантажити товари");
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Помилка завантаження товарів");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, tagFilters, minPrice, maxPrice]);

  const filtered = useMemo(() => {
    let list = [...products];

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const name = (p.name_uk || p.name || "").toLowerCase();
        const desc = (p.description_uk || p.description || "").toLowerCase();
        return name.includes(q) || desc.includes(q);
      });
    }

    const activeTags = Object.entries(tagFilters)
      .filter(([, value]) => value)
      .map(([key]) => key);
    if (activeTags.length) {
      list = list.filter((p) => activeTags.includes(p.tag));
    }

    const min = minPrice ? parseFloat(minPrice) : null;
    const max = maxPrice ? parseFloat(maxPrice) : null;

    if (!Number.isNaN(min) && min !== null) {
      list = list.filter((p) => Number(p.price) >= min);
    }
    if (!Number.isNaN(max) && max !== null) {
      list = list.filter((p) => Number(p.price) <= max);
    }

    return list;
  }, [products, search, tagFilters, minPrice, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const currentItems = filtered.slice(start, start + PER_PAGE);

  const toggleTag = (key) => {
    setTagFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNext = () => {
    setPage((p) => Math.min(totalPages, p + 1));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    window.dispatchEvent(new Event("ocandjur-cart-bump"));
  };

  if (loading) {
    return (
      <section className="catalog">
        <h2>Усі свічки Ocandjur</h2>
        <p>Завантаження каталогу...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="catalog">
        <h2>Усі свічки Ocandjur</h2>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="catalog">
      <h2>Усі свічки Ocandjur</h2>

      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <label className="catalog-search-label">
            Пошук по назві або опису
            <input
              className="catalog-search-input"
              placeholder="Наприклад: лаванда"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="catalog-filters-toggle"
            onClick={() => setShowFilters((v) => !v)}
          >
            {showFilters ? "Сховати фільтри" : "Показати фільтри"}
          </button>

          {showFilters && (
            <div className="catalog-filters">
              <div className="catalog-filter-group">
                <p className="catalog-filter-title">Мітки</p>
                <label>
                  <input
                    type="checkbox"
                    checked={tagFilters.new}
                    onChange={() => toggleTag("new")}
                  />{" "}
                  Новинки
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={tagFilters.bestseller}
                    onChange={() => toggleTag("bestseller")}
                  />{" "}
                  Бестселери
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={tagFilters.hot}
                    onChange={() => toggleTag("hot")}
                  />{" "}
                  Гаряча ціна
                </label>
              </div>

              <div className="catalog-filter-group">
                <p className="catalog-filter-title">Ціна, ₴</p>
                <div className="catalog-price-row">
                  <input
                    type="number"
                    placeholder="Від"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </aside>

        <div className="catalog-main">
          <div className="catalog-grid">
            {currentItems.map((p) => (
              <div key={p.id} className="catalog-card">
                <img
                  src={p.image_url || p.image}
                  alt={p.name_uk || p.name}
                  className="catalog-card-image"
                />
                <p className="catalog-card-name">
                  {p.name_uk || p.name || "Свічка"}
                </p>
                <p className="catalog-card-price">{p.price} ₴</p>
                <button type="button" onClick={() => handleAddToCart(p)}>
                  До кошика
                </button>
              </div>
            ))}
            {currentItems.length === 0 && (
              <p>За цими параметрами товарів не знайдено.</p>
            )}
          </div>

          <div className="catalog-pagination">
            <button
              type="button"
              onClick={handlePrev}
              disabled={safePage === 1}
            >
              Назад
            </button>
            <span>
              Сторінка {safePage} з {totalPages}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={safePage === totalPages}
            >
              Далі
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CatalogSection;
