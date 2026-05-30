import React, { useState } from "react";
import { MENU_DATA } from "../data";
import FoodCard from "../components/FoodCard";
import Footer from "../components/Footer";

export default function MenuPage({ setPage }) {
  const [active, setActive] = useState("Pizza");
  const cats = Object.keys(MENU_DATA);

  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <div className="menu-page" style={{ padding: "50px 50px 0", maxWidth: 1400, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", textAlign: "center", marginBottom: 40 }}>
          Our Delicious Menu
        </h1>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 50, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)} style={{
              padding: "13px 32px", borderRadius: 100, fontWeight: 600,
              fontFamily: "'Outfit',sans-serif", cursor: "pointer", fontSize: "0.95rem",
              background: active === c ? "var(--primary)" : "white",
              color: active === c ? "white" : "#000",
              border: "none", boxShadow: "var(--shadow-md)",
              transform: active === c ? "translateY(-3px)" : "none",
              transition: "var(--transition)",
            }}>{c}</button>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 30, flexWrap: "wrap", paddingBottom: 80 }}>
          {MENU_DATA[active].map(item => <FoodCard key={item.name} item={item} />)}
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}
