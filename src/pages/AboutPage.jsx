import React from "react";
import Footer from "../components/Footer";

export default function AboutPage({ setPage }) {
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <section style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80,
        alignItems: "center", padding: "100px 50px", maxWidth: 1400, margin: "0 auto",
      }}>
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=500&fit=crop"
          alt="About Grill & Fry"
          style={{ width: "100%", borderRadius: 40, boxShadow: "var(--shadow-lg)" }}
        />
        <div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", marginBottom: 24 }}>
            We are <span style={{ color: "var(--primary)" }}>GRILL & FRY</span>
          </h3>
          <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: 22 }}>
            Heart, family, soul, and profound roots. At Grill & Fry, we believe that food is more than just sustenance—it's a story of heritage and passion. Our kitchen is a place where tradition meets modern culinary techniques.
          </p>
          <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: 22 }}>
            Warmth and genuine hospitality are woven into every dish we serve. We nurture our recipes with care, ensuring that every bite tells a story of meaningful connections and unwavering passion.
          </p>
          <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.8 }}>
            It's not merely a restaurant; it's your second home, and a part of your journey.
          </p>
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}
