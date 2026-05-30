import React, { useState } from "react";
import "./styles/global.css";
import Navbar from "./components/Navbar";
import { btnStyle } from "./components/ui";

import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import BookingPage from "./pages/BookingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

import { getSession, clearSession } from "./utils/storage";

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
      {page !== "SignIn" && page !== "SignUp" && (
        <Navbar page={page} setPage={setPage} user={user} onLogout={logout} />
      )}
      {renderPage()}
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
