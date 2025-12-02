import React, { useEffect, useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { authFetch } from "../../api/admin";

function AdminOrdersPage() {
  const { token } = useAdminAuth();
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const res = await authFetch("/admin/orders", token);
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    if (token) load();
  }, [token]);

  const updateStatus = async (id, status) => {
    const res = await authFetch(`/admin/orders/${id}?new_status=${status}`, token, {
      method: "PATCH",
    });
    if (!res.ok) {
      alert("Помилка оновлення статусу");
      return;
    }
    const updated = await res.json();
    setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
  };

  if (!token) return <p>Немає доступу. Увійдіть як адміністратор.</p>;

  return (
    <main>
      <h1>Адмін: Замовлення</h1>
      {orders.map((o) => (
        <div key={o.id} className="order-card">
          <p>
            <strong>#{o.id}</strong> — {o.customer_name} ({o.customer_phone}, {o.customer_email})
          </p>
          <p>Статус: {o.status}</p>
          <ul>
            {o.items.map((i) => (
              <li key={i.product_id}>
                {i.product_name} × {i.quantity} — {i.price_at_time} ₴
              </li>
            ))}
          </ul>
          <button onClick={() => updateStatus(o.id, "sent")}>Позначити як відправлене</button>
          <button onClick={() => updateStatus(o.id, "paid")}>Позначити як оплачене</button>
        </div>
      ))}
    </main>
  );
}

export default AdminOrdersPage;
