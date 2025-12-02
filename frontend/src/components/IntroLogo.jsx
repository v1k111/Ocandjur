import React, { useEffect } from "react";
import logo from "../assets/logo-ocandjur.jpg";

function IntroLogo({ onFinish }) {
  useEffect(() => {
    const t = setTimeout(() => {
      onFinish();
    }, 2600); // длительность анимации в CSS
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div className="intro-overlay">
      <div className="intro-logo-wrapper">
        <div className="intro-ring">
          <img src={logo} alt="Ocandjur logo" className="intro-logo" />
        </div>
        <div className="intro-scan-line" />
        <p className="intro-caption">Ініціалізація Ocandjur...</p>
      </div>
    </div>
  );
}

export default IntroLogo;
