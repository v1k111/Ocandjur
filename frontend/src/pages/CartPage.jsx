import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { API_URL } from "../api/config";
import Header from "../components/Header";
import Footer from "../components/Footer";

function CartPage() {
  const cartContext = useCart();
  const { clearCart } = cartContext || {};
  const rawItems = (cartContext && (cartContext.items || cartContext.cartItems)) || [];
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const total = rawItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) * Number(item.quantity != null ? item.quantity : 1),
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function sendOrder(paymentMethod) {
    setError("");
    setSuccess("");
    if (!form.name || !form.email) {
      setError("Будь ласка, заповніть імʼя та e‑mail.");
      return;
    }
    if (!rawItems.length) {
      setError("Кошик порожній.");
      return;
    }

    try {
      setLoading(true);

      // тело запроса под існуючий бекенд /orders
      const body = {
        customer_name: form.name,
        customer_phone: form.phone || null,
        customer_email: form.email,
        items: rawItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity != null ? item.quantity : 1,
        })),
        // якщо захочеш — можна буде додати поле payment_method на бек
      };

      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Не вдалося створити замовлення");
      }

      // демо-оплата: тут має бути виклик Apple Pay / Google Pay / платіжного шлюзу
      // Зараз просто вважаємо, що оплата пройшла успішно.
      if (typeof clearCart === "function") {
        clearCart();
      }
      window.dispatchEvent(new Event("ocandjur-cart-bump"));

      setSuccess(
        paymentMethod === "apple_pay"
          ? "Оплата через Apple Pay (демо) пройшла успішно."
          : paymentMethod === "google_pay"
          ? "Оплата через Google Pay (демо) пройшла успішно."
          : "Оплата карткою (демо) пройшла успішно."
      );

      // невелика пауза й повернення на головну
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(err.message || "Сталася помилка під час оформлення замовлення.");
    } finally {
      setLoading(false);
    }
  }

  const handlePay = (method) => {
    if (loading) return;
    void sendOrder(method);
  };

  const isEmpty = rawItems.length === 0;

  return (
    <>
      <Header />

      <main className="cart-page">
        <h1>Кошик</h1>

        {isEmpty ? (
          <div className="cart-empty">
            <p>Ваш кошик порожній.</p>
            <Link to="/" className="cart-back-link">
              Повернутися до магазину
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Список товарів */}
            <section className="cart-items">
              {rawItems.map((item) => {
                const qty =
                  item.quantity != null && item.quantity > 0
                    ? item.quantity
                    : 1;
                const price = Number(item.price || 0);
                return (
                  <div key={item.id} className="cart-item-row">
                    <div className="cart-item-main">
                      {item.image && (
                        <img
                          src={item.image_url || item.image}
                          alt={item.name_uk || item.name}
                          className="cart-item-image"
                        />
                      )}
                      <div>
                        <p className="cart-item-name">
                          {item.name_uk || item.name || "Свічка"}
                        </p>
                        <p className="cart-item-price">
                          {price.toFixed(2)} ₴ × {qty}
                        </p>
                      </div>
                    </div>
                    <div className="cart-item-sum">
                      {(price * qty).toFixed(2)} ₴
                    </div>
                  </div>
                );
              })}

              <div className="cart-total-row">
                <span>Разом:</span>
                <span className="cart-total-amount">
                  {total.toFixed(2)} ₴
                </span>
              </div>
            </section>

            {/* Оформлення + способи оплати */}
            <section className="cart-checkout">
              <h2>Оформлення замовлення</h2>

              <form
                className="cart-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <label>
                  Імʼя*
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Телефон
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+38 ..."
                  />
                </label>
                <label>
                  E‑mail*
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>
              </form>

              <h3>Спосіб оплати</h3>
              <div className="payment-methods">
                <button
                  type="button"
                  className="payment-btn payment-btn--apple"
                  onClick={() => handlePay("apple_pay")}
                  disabled={loading}
                >
                   Pay
                </button>
                <button
                  type="button"
                  className="payment-btn payment-btn--google"
                  onClick={() => handlePay("google_pay")}
                  disabled={loading}
                >
                  Google Pay
                </button>
                <button
                  type="button"
                  className="payment-btn payment-btn--card"
                  onClick={() => handlePay("card")}
                  disabled={loading}
                >
                  Оплата карткою
                </button>
              </div>

              {loading && <p className="cart-status">Обробка оплати...</p>}
              {error && <p className="cart-status cart-status--error">{error}</p>}
              {success && (
                <p className="cart-status cart-status--success">{success}</p>
              )}

              <p className="cart-note">
                *Реальні Apple Pay / Google Pay вимагають інтеграції платіжного
                шлюзу (Stripe, Revolut тощо), верифікації домену та роботи
                через HTTPS. Зараз використовується демо‑оплата без списання
                коштів.
              </p>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default CartPage;
