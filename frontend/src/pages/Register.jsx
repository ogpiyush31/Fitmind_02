// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !username || !password) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      alert("✅ Registered successfully! You can now log in.");
      navigate("/Login");
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
          <span className="emoji" role="img" aria-label="brain">🧠</span>
          <div className="avatar-title">FitMind</div>
        </div>

        <form className="login-form" onSubmit={handleRegister} noValidate>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Your name"
            autoComplete="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="email@domain.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-link-prompt">
          Already have an account? <Link to="/Login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
