import React from "react";

function CategorySections() {
  return (
    <section className="categories">
      <div className="category-row">
        <h2>Новинки</h2>
        <p>Свіжі аромати та нові форми свічок, щойно з майстерні.</p>
      </div>
      <div className="category-row">
        <h2>Хіти продажу</h2>
        <p>Улюблені свічки наших клієнтів, перевірені часом.</p>
      </div>
      <div className="category-row">
        <h2>Гаряча ціна</h2>
        <p>Обрані позиції за спеціальною ціною, поки діє акція.</p>
      </div>
    </section>
  );
}

export default CategorySections;
