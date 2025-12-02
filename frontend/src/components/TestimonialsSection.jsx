import React from "react";

const TESTIMONIALS = [
  {
    name: "Ігор",
    text: "Свічки запалюються легко, аромат тримається довго. Ідеальний варіант для вечірнього відпочинку.",
  },
  {
    name: "Світлана",
    text: "Отримала набір у подарунок — тепер замовляю тільки тут. Гості постійно питають, що за аромат.",
  },
];

function TestimonialsSection() {
  return (
    <section className="testimonials">
      <h2>Відгуки клієнтів</h2>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="testimonial-card">
            <p className="testimonial-text">“{t.text}”</p>
            <p className="testimonial-name">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSection;
