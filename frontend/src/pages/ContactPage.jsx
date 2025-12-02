import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <h1>Контакты</h1>
        <p>Email: info@ocandjur.com</p>
        <p>Телефон: +7 (999) 123-45-67</p>
        <p>Адрес: г. Москва, ул. Свечная, д. 7</p>
      </main>
      <Footer />
    </>
  );
}

export default ContactPage;
