import React, { useState } from "react";

export default function ServiceCard({ s }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: "white", padding: 40, borderRadius: 30, textAlign: "center",
        boxShadow: hov ? "var(--shadow-lg)" : "var(--shadow-md)",
        transform: hov ? "translateY(-10px)" : "none",
        transition: "var(--transition)",
      }}
    >
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", marginBottom: 14 }}>{s.title}</h3>
      <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>{s.desc}</p>
      {s.soon && (
        <span style={{
          display: "inline-block", background: "var(--primary)", color: "white",
          padding: "4px 14px", borderRadius: 100, fontSize: "0.75rem",
          fontWeight: 700, marginTop: 14, textTransform: "uppercase",
        }}>Coming Soon</span>
      )}
    </div>
      
  );
}
