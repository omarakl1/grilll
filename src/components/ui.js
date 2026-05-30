export function btnStyle(type) {
  return type === "solid" ? {
    padding: "10px 24px", borderRadius: 12, fontWeight: 600,
    fontFamily: "'Outfit',sans-serif", cursor: "pointer", fontSize: "0.95rem",
    background: "var(--primary)", border: "none", color: "white",
    transition: "var(--transition)",
  } : {
    padding: "10px 24px", borderRadius: 12, fontWeight: 600,
    fontFamily: "'Outfit',sans-serif", cursor: "pointer", fontSize: "0.95rem",
    background: "transparent", border: "2px solid var(--primary)", color: "var(--primary)",
    transition: "var(--transition)",
  };
}
