import React from "react";

function HeroOffer() {
  return (
    <section className="hero-offer">
      <div className="hero-offer-inner">
        <div className="hero-offer-text">
          <h1>Спеціальна пропозиція для нових клієнтів</h1>
          <p>
            Замов свій перший набір свічок Ocandjur та отримай знижку 15% на
            наступну покупку. Темна естетика, тепле сяйво та унікальні аромати.
          </p>
          <button>Переглянути колекцію</button>
        </div>
        <div className="hero-offer-side">
          <p className="hero-pill">Нові колекції</p>
          <p className="hero-pill">Нічні аромати</p>
          <p className="hero-pill">Подарункові набори</p>
        </div>
      </div>
    </section>
  );
}

export default HeroOffer;
