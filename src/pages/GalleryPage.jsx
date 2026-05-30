import React from "react";
import Footer from "../components/Footer";
import { GALLERY_IMGS } from "../data";

export default function GalleryPage({ setPage }) {
  return (
    <div className="gallery-page" style={{ paddingTop: "var(--nav-h)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 50px" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", textAlign: "center", marginBottom: 50 }}>
          Our Gallery
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: 28 }}>
          {GALLERY_IMGS.map((src, i) => (
            <img key={i} src={src} alt={`Gallery ${i + 1}`}
              style={{ width: "100%", height: 320, objectFit: "cover", borderRadius: 28, boxShadow: "var(--shadow-md)" }}
            />
          ))}
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}
