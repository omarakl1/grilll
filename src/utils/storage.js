export function getUsers() {
  try { return JSON.parse(localStorage.getItem("gf_users") || "[]"); } catch { return []; }
}
export function saveUsers(u)
 { localStorage.setItem("gf_users", JSON.stringify(u)); }
export function getSession()
 {
  try { return JSON.parse(localStorage.getItem("gf_session") || "null"); } catch { return null; }
}
export function saveSession(u)
 { localStorage.setItem("gf_session", JSON.stringify(u)); }
export function clearSession()
 { localStorage.removeItem("gf_session"); }
export function getBookings() {
  try { return JSON.parse(localStorage.getItem("gf_bookings") || "[]"); } catch { return []; }
}
export function saveBookings(b)
 { localStorage.setItem("gf_bookings", JSON.stringify(b)); }
