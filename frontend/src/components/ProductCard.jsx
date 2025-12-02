import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price} ₴</p>
      <button onClick={() => addToCart(product)}>Додати до кошика</button>
      <br />
      <Link to={`/product/${product.id}`}>Докладніше</Link>
    </div>
  );
}

export default ProductCard;
