import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { API_URL } from "../api/config";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error("Помилка завантаження товарів");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Не вдалося завантажити товари");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return products;
    return products.filter((p) => {
      const haystack =
        (p.name + " " + p.description + " " + (p.keywords || []).join(" ")).toLowerCase();
      return q.split(/\s+/).every((word) => haystack.includes(word));
    });
  }, [products, search]);

  if (loading) return <section><h2>Магазин свічок</h2><p>Завантаження...</p></section>;
  if (error) return <section><h2>Магазин свічок</h2><p>{error}</p></section>;

  return (
    <section>
      <h2>Магазин свічок</h2>
      <input
        type="text"
        placeholder="Пошук за ключовими словами..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="product-list">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filtered.length === 0 && <p>За вашим запитом нічого не знайдено.</p>}
      </div>
    </section>
  );
}

export default ProductList;
