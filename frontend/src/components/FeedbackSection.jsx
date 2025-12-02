import React, { useState } from "react";

function FeedbackSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // тут можна буде відправити на backend
    alert("Дякуємо за звернення! Ми зв'яжемося з вами найближчим часом.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="feedback">
      <h2>Зворотний зв'язок</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Ваше ім'я"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Ваше повідомлення"
          value={form.message}
          onChange={handleChange}
        />
        <button type="submit">Надіслати</button>
      </form>
    </section>
  );
}

export default FeedbackSection;
