import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const MENU_DATA = {
  Pizza: [
    { name: "Shrimpy Pizza", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop" },
    { name: "Vegi Pizza", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=300&fit=crop" },
    { name: "Multi Pizza", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop" },
    { name: "Mushroom Pizza", img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300&h=300&fit=crop" },
  ],
  Burgers: [
    { name: "Classic Burger", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop" },
    { name: "Grilled Chicken Burger", img: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=300&h=300&fit=crop" },
    { name: "Beef Burger", img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=300&fit=crop" },
    { name: "Fillet Burger", img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300&h=300&fit=crop" },
  ],
  Sushi: [
    { name: "Classic Roll", img: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&h=300&fit=crop" },
    { name: "Dragon Roll", img: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300&h=300&fit=crop" },
    { name: "Salmon Nigiri", img: "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=300&h=300&fit=crop" },
    { name: "Rainbow Roll", img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=300&h=300&fit=crop" },
  ],
  Meats: [
    { name: "BBQ Meat Platter", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop" },
    { name: "Grilled Ribeye", img: "https://images.unsplash.com/photo-1558030006-450675393462?w=300&h=300&fit=crop" },
    { name: "Lamb Chops", img: "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=300&h=300&fit=crop" },
    { name: "Mixed Grill", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=300&fit=crop" },
  ],
  Drinks: [
    { name: "Fresh Lemonade", img: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=300&fit=crop" },
    { name: "Mango Smoothie", img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300&h=300&fit=crop" },
    { name: "Iced Coffee", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop" },
    { name: "Berry Blast", img: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=300&h=300&fit=crop" },
  ],
};

const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=400&fit=crop",
];

// ─── AUTH (localStorage) ─────────────────────────────────────────────────────
function getUsers() {
  try { return JSON.parse(localStorage.getItem("gf_users") || "[]"); } catch { return []; }
}
function saveUsers(u) { localStorage.setItem("gf_users", JSON.stringify(u)); }
function getSession() {
  try { return JSON.parse(localStorage.getItem("gf_session") || "null"); } catch { return null; }
}
function saveSession(u) { localStorage.setItem("gf_session", JSON.stringify(u)); }
function clearSession() { localStorage.removeItem("gf_session"); }

function getBookings() {
  try { return JSON.parse(localStorage.getItem("gf_bookings") || "[]"); } catch { return []; }
}
function saveBookings(b) { localStorage.setItem("gf_bookings", JSON.stringify(b)); }

// ─── STYLES ──────────────────────────────────────────────────────────────────
const S = {
  vars: `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800;900&display=swap');
    :root {
      --primary: #ff511c;
      --primary-hover: #e04416;
      --secondary: #000000;
      --bg: #fcf8f3;
      --card: #ffffff;
      --muted: #666;
      --nav-h: 80px;
      --shadow-md: 0 10px 30px rgba(0,0,0,0.08);
      --shadow-lg: 0 20px 40px rgba(0,0,0,0.12);
      --transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
      --container: 1400px;
    }
    *{margin:0;padding:0;box-sizing:border-box;}
    html,body,#root{height:100%;}
    body{font-family:'Outfit',sans-serif;background:var(--bg);color:#1a1a1a;overflow-x:hidden;-webkit-font-smoothing:antialiased}
    img{max-width:100%;height:auto;display:block}
    h1,h2,h3{line-height:1.05;margin:0}
    /* Layout helpers */
    .container{width:100%;max-width:var(--container);margin:0 auto;padding:0 20px;box-sizing:border-box}
    /* Hero and grids */
    .hero-section > div{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
    .about-section, .hero-section{display:block}
    .signature-row{display:flex;gap:30px;flex-wrap:wrap;justify-content:center}
    .food-card{width:260px}

    /* Nav responsive behavior */
    .nav-toggle{display:none;font-size:20px}
    .nav-links{display:flex;gap:28px;align-items:center}

    @media (max-width: 1024px){
      :root{--container:980px}
      .hero-section > div{grid-template-columns:1fr;gap:40px}
      .signature-row{gap:20px}
      .food-card{width:320px}
    }

    /* Mobile-first overrides (important to beat inline styles) */
    @media (max-width: 900px) {
      :root { --nav-h: 64px; }
      nav{height:var(--nav-h)!important}
      nav>div{padding:0 12px!important}
      .nav-toggle{display:inline-block!important}
      .nav-links{display:none!important}
      /* Mobile: fixed full-width black bar at bottom for easy reach */
      .nav-links.open{display:flex!important;flex-direction:row;position:fixed;bottom:0;left:0;right:0;top:auto;background:#000;padding:10px 8px;justify-content:space-around;gap:12px;z-index:1200;padding-bottom:calc(env(safe-area-inset-bottom,0px) + 12px)}
      .nav-links.open li{list-style:none;margin:0;padding:0}
      .nav-links.open button{color:#fff!important;border-bottom-color:transparent!important;background:none!important;padding:10px 14px;border-radius:10px;font-weight:600}

      /* Stack hero and about */
      .hero-section > div{grid-template-columns:1fr!important}
      .hero-section img{max-width:420px!important;margin:0 auto!important}
      .about-section{display:block!important}
      .about-section img{width:100%!important;height:auto!important;margin-bottom:18px!important}

      /* Signature rows become column */
      .signature-row{flex-direction:column;align-items:center;padding:0 12px!important}
      .food-card{width:100%!important;max-width:520px!important}
      .food-card img{width:100%!important;height:auto!important}

      /* Services and gallery collapse */
      .services-grid{grid-template-columns:1fr!important}
      .gallery-page div[style*="grid-template-columns"]{grid-template-columns:1fr!important}

      /* Footer stacks */
      .footer-grid{grid-template-columns:1fr!important;gap:20px!important;padding:24px 12px!important}

      /* Booking section responsive */
      .booking-section{margin:24px 12px!important;padding:32px 16px!important;border-radius:16px!important}
      .booking-section input{width:100%!important}
      .booking-float-btn{right:12px!important;bottom:12px!important}
    }

    /* When mobile menu is open, prevent page content from being covered */
    body.mobile-menu-open{padding-bottom:96px!important}
    body.mobile-menu-open .booking-float-btn{bottom:calc(96px + 12px)!important}

    @media (max-width:480px){
      :root{--nav-h:56px}
      h2{font-size:1.6rem!important}
      .food-card{max-width:420px!important}
    }
  `,
};

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, user, onLogout }) {
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
        {/* Logo */}
        <div onClick={() => setPage("Home")} style={{ cursor: "pointer" }}>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 900 }}>
            GRILL<span style={{ color: "var(--primary)" }}>&</span><span style={{ color: "var(--primary)" }}>FRY</span>
          </span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button aria-label="Toggle menu" onClick={() => setMenuOpen(v => !v)} className="nav-toggle" style={{
            display: "none", background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem",
          }}>☰</button>
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

        {/* Auth */}
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
              <button onClick={() => setPage("SignIn")} style={btnStyle("outline")}>Sign In</button>
              <button onClick={() => setPage("SignUp")} style={btnStyle("solid")}>Sign Up</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function btnStyle(type) {
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

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
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

// ─── HOME P
//AGE ───────────────────────────────────────────────────────────────
function Home({ setPage }) {
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      {/* Hero */}
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
              ...btnStyle("solid"), padding: "16px 40px", fontSize: "1.05rem", borderRadius: 14,
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

      {/* Signature Menu Preview */}
      <h2 style={{ textAlign: "center", fontFamily: "'Playfair Display',serif", fontSize: "3rem", margin: "80px 0 50px" }}>
        Our Signature Menu
      </h2>
      <div className="signature-row" style={{ display: "flex", justifyContent: "center", gap: 30, flexWrap: "wrap", padding: "0 50px", marginBottom: 60 }}>
        {MENU_DATA.Pizza.map(item => <FoodCard key={item.name} item={item} />)}
      </div>
      <div className="signature-row" style={{ display: "flex", justifyContent: "center", gap: 30, flexWrap: "wrap", padding: "0 50px", marginBottom: 60 }}>
        {MENU_DATA.Burgers.map(item => <FoodCard key={item.name} item={item} />)}
      </div>

      {/* About snippet */}
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

      {/* Booking CTA */}
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
        <button onClick={() => setPage("Booking")} style={{ ...btnStyle("solid"), padding: "16px 44px", fontSize: "1.05rem", borderRadius: 14 }}>
          Book Now
        </button>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

function FoodCard({ item }) {
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

// ─── MENU PAGE ───────────────────────────────────────────────────────────────
function MenuPage({ setPage }) {
  const [active, setActive] = useState("Pizza");
  const cats = Object.keys(MENU_DATA);

  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <div className="menu-page" style={{ padding: "50px 50px 0", maxWidth: 1400, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", textAlign: "center", marginBottom: 40 }}>
          Our Delicious Menu
        </h1>
        {/* Category tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 50, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)} style={{
              padding: "13px 32px", borderRadius: 100, fontWeight: 600,
              fontFamily: "'Outfit',sans-serif", cursor: "pointer", fontSize: "0.95rem",
              background: active === c ? "var(--primary)" : "white",
              color: active === c ? "white" : "#000",
              border: "none", boxShadow: "var(--shadow-md)",
              transform: active === c ? "translateY(-3px)" : "none",
              transition: "var(--transition)",
            }}>{c}</button>
          ))}
        </div>
        {/* Items */}
        <div style={{ display: "flex", justifyContent: "center", gap: 30, flexWrap: "wrap", paddingBottom: 80 }}>
          {MENU_DATA[active].map(item => <FoodCard key={item.name} item={item} />)}
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

function ServiceCard({ s }) {
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

// ─── SERVICES PAGE ───────────────────────────────────────────────────────────
function ServicesPage({ setPage }) {
  const services = [
    { title: "Dine-In Experience", desc: "Enjoy a cozy and inviting atmosphere with our gourmet dishes and attentive service.", soon: false },
    { title: "Takeout & Delivery", desc: "Order your favorite meals to-go or have them delivered right to your doorstep.", soon: true },
    { title: "Catering Services", desc: "Let us cater your special events with our exquisite menu options and professional service.", soon: false },
    { title: "Special Events", desc: "Host your celebrations with us and enjoy a tailored menu and dedicated event planning.", soon: false },
  ];

  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 50px" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", textAlign: "center", marginBottom: 60 }}>
          Premium Services
        </h1>
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 30 }}>
          {services.map(s => <ServiceCard key={s.title} s={s} />)}
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

// ─── ABOUT PAGE ──────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {
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

// ─── GALLERY PAGE ────────────────────────────────────────────────────────────
function GalleryPage({ setPage }) {
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

// ─── BOOKING PAGE ────────────────────────────────────────────────────────────
function BookingPage({ setPage, user }) {
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

// ─── SIGN IN PAGE ────────────────────────────────────────────────────────────
function SignInPage({ setPage, onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = () => {
    const users = getUsers();
    const found = users.find(u => u.email === form.email && u.password === form.password);
    if (!found) { setError("Incorrect email or password."); return; }
    saveSession(found);
    onLogin(found);
    setPage("Home");
  };

  return <AuthLayout title="Sign In" footer={<>Don't have an account? <span style={{ color: "var(--primary)", cursor: "pointer" }} onClick={() => setPage("SignUp")}>Sign Up</span></>} onBack={() => setPage("Home")}>
    {error && <div style={{ color: "#f87171", marginBottom: 16, fontWeight: 600 }}>{error}</div>}
    <AuthInput label="Email Address" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} placeholder="name@example.com" />
    <AuthInput label="Password" type="password" value={form.password} onChange={v => setForm({ ...form, password: v })} placeholder="••••••••" />
    <button onClick={submit} style={{ ...btnStyle("solid"), width: "100%", padding: "14px", borderRadius: 12, marginTop: 8 }}>Sign In</button>
  </AuthLayout>;
}

// ─── SIGN UP PAGE ────────────────────────────────────────────────────────────
function SignUpPage({ setPage, onLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const submit = () => {
    if (!form.name || !form.email || !form.password || !form.confirm) { setError("Please fill in all fields."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    const users = getUsers();
    if (users.find(u => u.email === form.email)) { setError("Email already registered."); return; }
    const newUser = { id: Date.now(), name: form.name, email: form.email, password: form.password };
    saveUsers([...users, newUser]);
    saveSession(newUser);
    onLogin(newUser);
    setPage("Home");
  };

  return <AuthLayout title="Sign Up" footer={<>Already have an account? <span style={{ color: "var(--primary)", cursor: "pointer" }} onClick={() => setPage("SignIn")}>Sign In</span></>} onBack={() => setPage("Home")}>
    {error && <div style={{ color: "#f87171", marginBottom: 16, fontWeight: 600 }}>{error}</div>}
    <AuthInput label="Full Name" type="text" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="John Doe" />
    <AuthInput label="Email Address" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} placeholder="name@example.com" />
    <AuthInput label="Password" type="password" value={form.password} onChange={v => setForm({ ...form, password: v })} placeholder="Minimum 6 characters" />
    <AuthInput label="Confirm Password" type="password" value={form.confirm} onChange={v => setForm({ ...form, confirm: v })} placeholder="Re-type password" />
    <button onClick={submit} style={{ ...btnStyle("solid"), width: "100%", padding: "14px", borderRadius: 12, marginTop: 8 }}>Create Account</button>
  </AuthLayout>;
}

function AuthLayout({ title, children, footer, onBack }) {
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

function AuthInput({ label, type, value, onChange, placeholder }) {
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

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const [user, setUser] = useState(() => getSession());

  const logout = () => { clearSession(); setUser(null); setPage("Home"); };
  const login = (u) => setUser(u);

  const renderPage = () => {
    switch (page) {
      case "Home": return <Home setPage={setPage} />;
      case "Menu": return <MenuPage setPage={setPage} />;
      case "Services": return <ServicesPage setPage={setPage} />;
      case "About": return <AboutPage setPage={setPage} />;
      case "Gallery": return <GalleryPage setPage={setPage} />;
      case "Booking": return <BookingPage setPage={setPage} user={user} />;
      case "SignIn": return <SignInPage setPage={setPage} onLogin={login} />;
      case "SignUp": return <SignUpPage setPage={setPage} onLogin={login} />;
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{S.vars}</style>
      {page !== "SignIn" && page !== "SignUp" && (
        <Navbar page={page} setPage={setPage} user={user} onLogout={logout} />
      )}
      {renderPage()}
      {/* Booking button in nav if logged in */}
      {user && page !== "SignIn" && page !== "SignUp" && page !== "Booking" && (
        <div className="booking-float-btn" style={{ position: "fixed", bottom: 30, right: 30, zIndex: 999 }}>
          <button onClick={() => setPage("Booking")} style={{
            ...btnStyle("solid"), padding: "14px 28px", borderRadius: 100,
            boxShadow: "0 10px 30px rgba(255,81,28,0.35)", fontSize: "0.95rem",
          }}>
            Book a Table
          </button>
        </div>
      )}
    </>
  );
}
