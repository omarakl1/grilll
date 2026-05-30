import React, { useState } from "react";

export default function FoodCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="food-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white", padding: 28, borderRadius: 28, textAlign: "center",
        boxShadow: hovered ? "var(--shadow-lg)" : "var(--shadow-md)",
        transform: hovered ? "translateY(-12px)" : "none",
        transition: "var(--transition)", width: 260,
      }}
    >
      <img src={item.img} alt={item.name} style={{ width: 180, height: 180, objectFit: "cover", borderRadius: 20, marginBottom: 16 }} />
      <p style={{ fontWeight: 700, fontSize: "1.1rem" }}>{item.name}</p>
    </div>
  );
}
