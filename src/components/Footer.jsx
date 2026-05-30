import React from "react";

export default function Footer({ setPage }) {
  return (
    <footer style={{ background: "#000", color: "white", padding: "60px 50px 30px" }}>
      <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40, maxWidth: 1200, margin: "0 auto 50px" }}>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", marginBottom: 16 }}>
            GRILL<span style={{ color: "var(--primary)" }}>&FRY</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
            Premium grilled and fried delicacies served with a touch of elegance.
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: 20 }}>Quick Links</h4>
          { ["Menu", "Services", "About", "Gallery"].map(l => (
            <div key={l} style={{ marginBottom: 10 }}>
              <button onClick={() => setPage(l)} style={{
                background: "none", border: "none", color: "rgba(255,255,255,0.6)",
                cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontSize: "0.95rem",
                transition: "color 0.2s",
              }}>{l}</button>
            </div>
          ))}
        </div>
        <div>
          <h4 style={{ marginBottom: 20 }}>Contact Us</h4>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 10 }}>LIU, Khiara, Lebanon</p>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 10 }}>+961 123 456</p>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>info@grillfry.com</p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 30, textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
        © 2026 GRILL & FRY. All rights reserved OmarAKL.
      </div>
    </footer>
  );
}
