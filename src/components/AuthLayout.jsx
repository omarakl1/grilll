import React from "react";

export function AuthLayout({ title, children, footer, onBack }) {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center",
      background: "var(--bg)", padding: 20,
    }}>
      <div style={{
        background: "white", borderRadius: 28, padding: "48px 44px", width: "100%", maxWidth: 460,
        boxShadow: "var(--shadow-lg)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", marginBottom: 4 }}>
            GRILL<span style={{ color: "var(--primary)" }}>&FRY</span>
          </h1>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem" }}>{title}</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>{children}</div>
        <div style={{ textAlign: "center", marginTop: 20, color: "var(--muted)", fontSize: "0.9rem" }}>{footer}</div>
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "0.8rem" }}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export function AuthInput({ label, type, value, onChange, placeholder }) {
  return (
    <div>
      <label style={{ display: "block", fontWeight: 600, marginBottom: 8, fontSize: "0.9rem" }}>{label}</label>
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        style={{
          width: "100%", height: 52, padding: "0 16px", borderRadius: 12,
          border: "2px solid #e5e5e5", fontFamily: "'Outfit',sans-serif",
          fontSize: "1rem", outline: "none", transition: "border 0.2s",
        }}
        onFocus={e => e.target.style.borderColor = "var(--primary)"}
        onBlur={e => e.target.style.borderColor = "#e5e5e5"}
      />
    </div>
  );
}
