// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);
      alert("✅ Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="avatar-wrapper">
          <span className="emoji" role="img" aria-label="mind">🧠</span>
          <div className="avatar-title">FitMind</div>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="auth-link-prompt">
          Don’t have an account? <Link to="/Register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
