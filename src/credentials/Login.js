import { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081",
  withCredentials: true, // Send cookies with requests
});

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });
      handleLogin(response.data);
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleLoginSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p className="auth-footer">
          Don’t have an account? <Link to="/credentials/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
