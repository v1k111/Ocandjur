import React from "react";

function AdvantagesSection() {
  return (
    <section className="advantages">
      <h2>Наші переваги</h2>
      <div className="advantages-grid">
        <div className="adv-card">
          <h3>Широкий асортимент</h3>
          <p>
            Колекції для дому, офісу та подарунків: від міні‑свічок до великих
            композицій.
          </p>
        </div>
        <div className="adv-card">
          <h3>Чесні ціни</h3>
          <p>
            Працюємо без посередників та уважно підбираємо сировину, щоб ціна
            відповідала якості.
          </p>
        </div>
        <div className="adv-card">
          <h3>Контроль якості</h3>
          <p>
            Кожна свічка проходить перевірку горіння та аромату перед тим, як
            потрапити до тебе.
          </p>
        </div>
        <div className="adv-card">
          <h3>Подарунки та акції</h3>
          <p>
            Регулярні знижки, сезонні набори та приємні бонуси для постійних
            клієнтів.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AdvantagesSection;
