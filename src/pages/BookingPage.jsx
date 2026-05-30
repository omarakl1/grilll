import React, { useState } from "react";
import Footer from "../components/Footer";
import { getBookings, saveBookings } from "../utils/storage";

export default function BookingPage({ setPage, user }) {
  const [form, setForm] = useState({ name: user?.name || "", phone: "", people: "", date: "", time: "" });
  const [msg, setMsg] = useState(null);

  const submit = () => {
    const { name, phone, people, date, time } = form;
    if (!name || !phone || !people || !date || !time) {
      setMsg({ type: "error", text: "Please fill in all fields." });
      return;
    }
    const bookings = getBookings();
    bookings.push({ ...form, id: Date.now() });
    saveBookings(bookings);
    setMsg({ type: "success", text: "Booking confirmed! See you soon." });
    setForm({ name: "", phone: "", people: "", date: "", time: "" });
  };

  const input = (field, type = "text", placeholder = "") => (
    <div style={{ textAlign: "left" }}>
      <label style={{ display: "block", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: 1, opacity: 0.7, marginBottom: 8 }}>
        {field}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[field.toLowerCase().replace(" ", "")]}
        onChange={e => setForm({ ...form, [field.toLowerCase().replace(" ", "")]: e.target.value })}
        style={{
          width: "100%", height: 56, padding: "0 18px", borderRadius: 14,
          border: "none", background: "rgba(255,255,255,0.12)", color: "white",
          fontFamily: "'Outfit',sans-serif", fontSize: "1rem",
          outline: "none",
        }}
      />
    </div>
  );

  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <section style={{
        background: "#000", color: "white", padding: "80px 50px",
        borderRadius: 60, margin: "60px 50px", textAlign: "center",
      }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", marginBottom: 50 }}>
          Reserve Your Table
        </h2>
        {msg && (
          <div style={{
            marginBottom: 30, padding: "14px 24px", borderRadius: 12,
            background: msg.type === "success" ? "rgba(0,200,100,0.15)" : "rgba(255,80,80,0.15)",
            color: msg.type === "success" ? "#4ade80" : "#f87171",
            fontWeight: 600,
          }}>{msg.text}</div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
          {input("name", "text", "Your full name")}
          {input("phone", "tel", "+961 123 456")}
          {input("people", "number", "Number of guests")}
          {input("date", "date")}
          {input("time", "time")}
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button onClick={submit} style={{
              width: "100%", height: 56, background: "var(--primary)", color: "white",
              border: "none", borderRadius: 14, fontWeight: 700, fontSize: "1rem",
              fontFamily: "'Outfit',sans-serif", cursor: "pointer",
              transition: "var(--transition)",
            }}>Confirm Booking</button>
          </div>
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}
