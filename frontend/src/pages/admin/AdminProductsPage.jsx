import React, { useEffect, useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { authFetch } from "../../api/admin";

function AdminProductsPage() {
  const { token } = useAdminAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name_uk: "",
    description_uk: "",
    price: "",
    image_url: "",
    keywords: "",
  });

  useEffect(() => {
    if (!token) return;

    authFetch("/admin/products", token)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Unexpected products response:", data);
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load products", err);
      });
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await authFetch("/admin/products", token, {
      method: "POST",
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        is_active: true,
      }),
    });

    if (!res.ok) {
      alert("Помилка збереження свічки");
      return;
    }

    const created = await res.json();
    setProducts((prev) => [...prev, created]);
    setForm({
      name_uk: "",
      description_uk: "",
      price: "",
      image_url: "",
      keywords: "",
    });
  };

  if (!token) {
    return <p>Немає доступу. Увійдіть як адміністратор.</p>;
  }

  return (
    <main>
      <h1>Адмін: Свічки</h1>

      <section>
        <h2>Додати нову свічку</h2>
        <form onSubmit={handleCreate}>
          <input
            name="name_uk"
            placeholder="Назва"
            value={form.name_uk}
            onChange={handleChange}
          />
          <input
            name="price"
            type="number"
            placeholder="Ціна"
            value={form.price}
            onChange={handleChange}
          />
          <input
            name="image_url"
            placeholder="URL зображення"
            value={form.image_url}
            onChange={handleChange}
          />
          <input
            name="keywords"
            placeholder="Ключові слова (через кому)"
            value={form.keywords}
            onChange={handleChange}
          />
          <textarea
            name="description_uk"
            placeholder="Опис"
            value={form.description_uk}
            onChange={handleChange}
          />
          <button type="submit">Зберегти</button>
        </form>
      </section>

      <section>
        <h2>Список свічок</h2>
        {products.map((p) => (
          <div key={p.id}>
            <strong>{p.name_uk}</strong> — {p.price} ₴{" "}
            ({p.is_active ? "активна" : "прихована"})
          </div>
        ))}
        {products.length === 0 && <p>Поки що немає жодної свічки.</p>}
      </section>
    </main>
  );
}

export default AdminProductsPage;
