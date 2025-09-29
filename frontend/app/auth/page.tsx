"use client";
import { useState } from "react";
import "../auth.css";
import Image from "next/image";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  // State cho login
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // State cho register
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Thông báo
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Xử lý login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // ✅ Lưu user vào localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("✅ Login successful!");
      window.location.href = "/"; // Chuyển về trang chủ
    } catch {
      setError("Something went wrong!");
    }
  };

  // Xử lý register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: regUsername,
          email: regEmail,
          password: regPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Register failed");
        return;
      }

      setMessage("🎉 Register successful! You can now login.");
      setIsRegister(false);
    } catch {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <div className={`wrapper ${isRegister ? "active" : ""}`}>
        <span className="rotate-bg"></span>
        <span className="rotate-bg2"></span>

        {/* Logo */}
        <div
          className={`brand-box ${
            isRegister ? "left init-left" : "right init-right"
          }`}
        >
          <Image
            src="/logo.png"
            alt="Daily HearWrite Logo"
            width={110}
            height={110}
            className="rounded-md"
          />
          <h1
            className="text-4xl font-extrabold 
              bg-gradient-to-r from-[#30cfd0] to-[#57c9ef] 
              bg-clip-text text-transparent 
              transition-all duration-500"
          >
            Daily<br />HearWrite
          </h1>
        </div>

        {/* LOGIN FORM */}
        <div className="form-box login">
          <h2 className="title animation">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-box animation">
              <input
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
              />
              <label>Username</label>
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box animation">
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <label>Password</label>
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn animation">
              Login
            </button>

            {/* Hiện lỗi/thông báo chỉ trong tab login */}
            {error && !isRegister && <p className="text-red-500 mt-2">{error}</p>}
            {message && !isRegister && <p className="text-green-500 mt-2">{message}</p>}

            <div className="linkTxt animation">
              <p>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="register-link text-blue-600 underline"
                  onClick={() => {
                    setIsRegister(true);
                    setError("");
                    setMessage("");
                  }}
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
              <input
                type="text"
                required
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
              />
              <label>Username</label>
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box animation">
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
              <label>Email</label>
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box animation">
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
              <label>Password</label>
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn animation">
              Register
            </button>

            {/* Hiện lỗi/thông báo chỉ trong tab register */}
            {error && isRegister && <p className="text-red-500 mt-2">{error}</p>}
            {message && isRegister && <p className="text-green-500 mt-2">{message}</p>}

            <div className="linkTxt animation">
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  className="login-link text-blue-600 underline"
                  onClick={() => {
                    setIsRegister(false);
                    setError("");
                    setMessage("");
                  }}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
