import React, { useState } from "react";
import { AuthLayout, AuthInput } from "../components/AuthLayout";
import { getUsers, saveUsers, saveSession } from "../utils/storage";

export default function SignUpPage({ setPage, onLogin }) {
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

  return <AuthLayout title="Sign Up" footer={<>Already have an account? <span style={{ color: "var(--primary)", cursor: "pointer" }} onClick={() => setPage("SignIn")}>Sign In</span></>} onBack={() => setPage("Home")}>{
    <>
      {error && <div style={{ color: "#f87171", marginBottom: 16, fontWeight: 600 }}>{error}</div>}
      <AuthInput label="Full Name" type="text" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="John Doe" />
      <AuthInput label="Email Address" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} placeholder="name@example.com" />
      <AuthInput label="Password" type="password" value={form.password} onChange={v => setForm({ ...form, password: v })} placeholder="Minimum 6 characters" />
      <AuthInput label="Confirm Password" type="password" value={form.confirm} onChange={v => setForm({ ...form, confirm: v })} placeholder="Re-type password" />
      <button onClick={submit} style={{ width: "100%", padding: "14px", borderRadius: 12, marginTop: 8, background: "var(--primary)", color: "white", border: "none", fontWeight: 700 }}>Create Account</button>
    </>
  }</AuthLayout>;
}
