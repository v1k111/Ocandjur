import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { API_URL } from "../api/config";

function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`${API_URL}/products/${id}`);
        if (!res.ok) throw new Error("Товар не знайдено");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || "Помилка завантаження товару");
      }
    }
    loadProduct();
  }, [id]);

  return (
    <>
      <Header />
      <main>
        {error && <p>{error}</p>}
        {!error && !product && <p>Завантаження...</p>}
        {product && (
          <>
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <p>{product.price} ₴</p>
            <button onClick={() => addToCart(product)}>Додати до кошика</button>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default ProductDetailsPage;
