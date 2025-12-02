import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../api/admin";
import { useAdminAuth } from "../../context/AdminAuthContext";

function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await adminLogin(password);
      login(token);
      navigate("/admin/products");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main>
      <h1>Вхід адміністратора</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Пароль адміністратора"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Увійти</button>
      </form>
      {error && <p>{error}</p>}
    </main>
  );
}

export default AdminLoginPage;
