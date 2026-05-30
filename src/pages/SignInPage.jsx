import React, { useState } from "react";
import { AuthLayout, AuthInput } from "../components/AuthLayout";
import { getUsers, saveSession } from "../utils/storage";

export default function SignInPage({ setPage, onLogin }) {
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
    <button onClick={submit} style={{ width: "100%", padding: "14px", borderRadius: 12, marginTop: 8, background: "var(--primary)", color: "white", border: "none", fontWeight: 700 }}>Sign In</button>
  </AuthLayout>;
}
