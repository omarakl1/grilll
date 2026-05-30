import React, { useState, useEffect } from "react";
import { btnStyle } from "./ui";

export default function Navbar({ page, setPage, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (typeof document !== "undefined" && document.body) {
      document.body.classList.toggle("mobile-menu-open", menuOpen);
    }
    return () => {
      if (typeof document !== "undefined" && document.body) {
        document.body.classList.remove("mobile-menu-open");
      }
    };
  }, [menuOpen]);
  const links = ["Home", "Menu", "Services", "About", "Gallery"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "var(--nav-h)",
      background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
      zIndex: 1400, boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      display: "flex", justifyContent: "center", alignItems: "center",
    }}>
      <div style={{
        width: "100%", maxWidth: 1400, padding: "0 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button aria-label="Toggle menu" onClick={() => setMenuOpen(v => !v)} className="nav-toggle" style={{
            display: "none", background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem",
          }}>☰</button>
          <div onClick={() => setPage("Home")} style={{ cursor: "pointer" }}>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 900 }}>
            GRILL<span style={{ color: "var(--primary)" }}>&</span><span style={{ color: "var(--primary)" }}>FRY</span>
          </span>
        </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ul className={menuOpen ? "nav-links open" : "nav-links"} style={{ display: "flex", listStyle: "none", gap: 28 }}>
            {links.map(l => (
              <li key={l}>
                <button onClick={() => { setPage(l); setMenuOpen(false); }} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Outfit',sans-serif", fontWeight: 500, fontSize: "1rem",
                  color: page === l ? "var(--primary)" : "#1a1a1a",
                  borderBottom: page === l ? "2px solid var(--primary)" : "2px solid transparent",
                  paddingBottom: 4, transition: "var(--transition)",
                }}>{l}</button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {user ? (
            <>
              <span style={{ color: "var(--muted)", fontWeight: 600, fontSize: "0.9rem" }}>
                Welcome, {user.name}
              </span>
              <button onClick={onLogout} style={btnStyle("outline")}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => setPage("SignIn")} style={{ ...btnStyle("outline"), padding: "6px 12px", fontSize: "0.85rem", borderRadius: 10 }}>Sign In</button>
              <button onClick={() => setPage("SignUp")} style={{ ...btnStyle("solid"), padding: "6px 12px", fontSize: "0.85rem", borderRadius: 10 }}>Sign Up</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
