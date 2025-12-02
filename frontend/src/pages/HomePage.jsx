import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Background from "../components/Background";
import ProductList from "../components/ProductList";

function HomePage() {
  return (
    <>
      <Header />
      <Background />
      <ProductList />
      <Footer />
    </>
  );
}

export default HomePage;
