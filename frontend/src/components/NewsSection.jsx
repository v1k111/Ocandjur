import React from "react";

const NEWS = [
  {
    date: "11.03.2025",
    title: "Нова колекція «Нічне місто»",
  },
  {
    date: "06.03.2025",
    title: "Безкоштовна доставка при замовленні від 1500 ₴",
  },
  {
    date: "03.03.2025",
    title: "Ocandjur на маркеті локальних брендів",
  },
];

function NewsSection() {
  return (
    <section className="news">
      <h2>Новини та акції</h2>
      <div className="news-list">
        {NEWS.map((n) => (
          <div key={n.date + n.title} className="news-item">
            <p className="news-title">{n.title}</p>
            <p className="news-date">{n.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewsSection;
