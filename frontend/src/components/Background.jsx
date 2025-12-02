import React from "react";

function Background() {
  return (
    <section style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <img 
        src="/src/assets/background.jpg" 
        alt="Background" 
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }} 
      />
      <h1>Ocandjur - свечи, созданные с душой</h1>
    </section>
  );
}

export default Background;
