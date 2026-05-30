import React from "react";
import FoodCard from "../components/FoodCard";
import Footer from "../components/Footer";
import { MENU_DATA } from "../data";

export default function Home({ setPage }) {
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <section className="hero-section" style={{
        minHeight: "calc(100vh - var(--nav-h))", display: "flex", alignItems: "center",
        padding: "0 50px", maxWidth: 1400, margin: "0 auto",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", width: "100%" }}>
          <div style={{ animation: "fadeUp 0.8s ease both" }}>
            <h2 style={{
              fontFamily: "'Playfair Display',serif", fontSize: "4.5rem", lineHeight: 1.1,
              marginBottom: 24, color: "#000",
            }}>
              Order Your Best<br />Food <span style={{ color: "var(--primary)" }}>Anytime</span>
            </h2>
            <p style={{ fontSize: "1.15rem", color: "var(--muted)", marginBottom: 36, maxWidth: 460 }}>
              Experience the perfect blend of grilled perfection and crispy delight. Crafted with passion, served with love.
            </p>
            <button onClick={() => setPage("Menu")} style={{
              padding: "16px 40px", fontSize: "1.05rem", borderRadius: 14,
              ...{ },
            }}>Explore Food</button>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=500&fit=crop"
              alt="Featured Food"
              style={{
                width: "100%", maxWidth: 520, borderRadius: "50%",
                boxShadow: "0 40px 80px rgba(255,81,28,0.2)",
                animation: "rotateSlow 40s linear infinite",
              }}
            />
          </div>
        </div>
      </section>

      <h2 style={{ textAlign: "center", fontFamily: "'Playfair Display',serif", fontSize: "3rem", margin: "80px 0 50px" }}>
        Our Signature Menu
      </h2>
      <div className="signature-row" style={{ display: "flex", justifyContent: "center", gap: 30, flexWrap: "wrap", padding: "0 50px", marginBottom: 60 }}>
        {MENU_DATA.Pizza.map(item => <FoodCard key={item.name} item={item} />)}
      </div>
      <div className="signature-row" style={{ display: "flex", justifyContent: "center", gap: 30, flexWrap: "wrap", padding: "0 50px", marginBottom: 60 }}>
        {MENU_DATA.Burgers.map(item => <FoodCard key={item.name} item={item} />)}
      </div>

      <section className="about-section" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80,
        alignItems: "center", padding: "80px 50px", maxWidth: 1400, margin: "0 auto",
      }}>
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=500&fit=crop"
          alt="About"
          style={{ width: "100%", borderRadius: 40, boxShadow: "var(--shadow-lg)" }}
        />
        <div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.8rem", marginBottom: 20 }}>
            We are <span style={{ color: "var(--primary)" }}>GRILL & FRY</span>
          </h3>
          <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: 20 }}>
            Heart, family, soul, and profound roots. At Grill & Fry, we believe that food is more than just sustenance—it's a story of heritage and passion.
          </p>
          <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.8 }}>
            Warmth and genuine hospitality are woven into every dish we serve. It's not merely a restaurant; it's your second home.
          </p>
        </div>
      </section>

      <section className="booking-section" style={{
        background: "#000", color: "white", padding: "80px 50px",
        borderRadius: 60, margin: "80px 50px", textAlign: "center",
      }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", marginBottom: 20 }}>
          Reserve Your Table
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 36, fontSize: "1.1rem" }}>
          Book ahead and enjoy a seamless dining experience
        </p>
        <button onClick={() => setPage("Booking")} style={{ padding: "16px 44px", fontSize: "1.05rem", borderRadius: 14 }}>
          Book Now
        </button>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}
