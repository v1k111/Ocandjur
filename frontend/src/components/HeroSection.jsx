import React from "react";
import logo from "../assets/logo-ocandjur.jpg";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-logo-col">
          <img src={logo} alt="Ocandjur logo" className="hero-logo-image" />
        </div>
        <div className="hero-text-col">
          <h1>Ocandjur</h1>
          <p>
            Атмосферні свічки ручної роботи у темній вогняній естетиці.
            Кожна свічка створена, щоб підкреслити настрій вечора,
            додати тепла й легкий техно‑містичний настрій.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
