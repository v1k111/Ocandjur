import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function CartPage() {
  const { items, changeQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  const handleCheckout = () => {
    // Здесь пока просто alert, потом можно прикрутить реальну оплату
    alert("Дякуємо за замовлення! Ми зв'яжемося з вами для підтвердження.");
    clearCart();
  };

  return (
    <>
      <Header />
      <main>
        <h1>Кошик</h1>
        {items.length === 0 && <p>Ваш кошик порожній.</p>}
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="cart-item">
            <span>{product.name}</span>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => changeQuantity(product.id, Number(e.target.value))}
            />
            <span>{product.price * quantity} ₴</span>
            <button onClick={() => removeFromCart(product.id)}>Видалити</button>
          </div>
        ))}
        {items.length > 0 && (
          <>
            <h2>Разом: {totalPrice} ₴</h2>
            <button onClick={handleCheckout}>Придбати</button>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default CartPage;
