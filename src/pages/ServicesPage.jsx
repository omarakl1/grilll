import React from "react";
import ServiceCard from "../components/ServiceCard";
import Footer from "../components/Footer";

export default function ServicesPage({ setPage }) {
  const services = [
    { title: "Dine-In Experience", desc: "Enjoy a cozy and inviting atmosphere with our gourmet dishes and attentive service.", soon: false },
    { title: "Takeout & Delivery", desc: "Order your favorite meals to-go or have them delivered right to your doorstep.", soon: true },
    { title: "Catering Services", desc: "Let us cater your special events with our exquisite menu options and professional service.", soon: false },
    { title: "Special Events", desc: "Host your celebrations with us and enjoy a tailored menu and dedicated event planning.", soon: false },
  ];

  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 50px" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", textAlign: "center", marginBottom: 60 }}>
          Premium Services
        </h1>
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 30 }}>
          {services.map(s => <ServiceCard key={s.title} s={s} />)}
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}
