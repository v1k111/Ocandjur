export const API_URL = "http://localhost:8000";

export async function adminLogin(password) {
  const res = await fetch(`${API_URL}/auth/admin-login`, {
    method: "POST",
  headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw new Error("Невірний пароль адміністратора");
  return res.json(); // { token }
}

export function authFetch(path, token, options = {}) {
  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
}
