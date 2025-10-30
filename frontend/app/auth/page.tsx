"use client";
import { useState } from "react";
import "../auth.css";
import Image from "next/image";
import SocialLogin from "@/components/SocialLogin";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [loading, setLoading] = useState(false); // ✅ trạng thái loading

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Invalid credentials ❌");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("✅ Login successful!");
      setTimeout(() => (window.location.href = "/"), 1000);
    } catch {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: regUsername, email: regEmail, password: regPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Register failed ❌");
        setLoading(false);
        return;
      }

      toast.success("🎉 Register successful! Please login.");
      setIsRegister(false);
    } catch {
      toast.error("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className={`wrapper ${isRegister ? "active" : ""}`}>
        <span className="rotate-bg"></span>
        <span className="rotate-bg2"></span>

        <div
          className={`brand-box ${isRegister ? "left init-left" : "right init-right"}`}
        >
          <Image src="/logo.png" alt="Logo" width={110} height={110} className="rounded-md" />
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent transition-all duration-500">
            Daily<br />HearWrite
          </h1>
        </div>

        {/* LOGIN FORM */}
        <div className="form-box login">
          <h2 className="title animation">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-box animation">
              <input type="text" required value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
              <label>Username</label>
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box animation">
              <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              <label>Password</label>
              <i className="bx bxs-lock-alt"></i>
            </div>

            <button type="submit" className="btn animation" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  Logging in
                  <span className="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                </span>
              ) : (
                "Login"
              )}
            </button>

            <div className="linkTxt animation">
              <p>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="register-link text-blue-600 underline"
                  onClick={() => setIsRegister(true)}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* REGISTER FORM */}
        <div className="form-box register">
          <h2 className="title animation">Sign Up</h2>
          <form onSubmit={handleRegister}>
            <div className="input-box animation">
              <input type="text" required value={regUsername} onChange={(e) => setRegUsername(e.target.value)} />
              <label>Username</label>
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box animation">
              <input type="email" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
              <label>Email</label>
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box animation">
              <input type="password" required value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
              <label>Password</label>
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn animation" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  Registering
                  <span className="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                </span>
              ) : (
                "Register"
              )}
            </button>

            <div className="linkTxt animation">
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  className="login-link text-blue-600 underline"
                  onClick={() => setIsRegister(false)}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
      <SocialLogin />
    </div>
  );
}
