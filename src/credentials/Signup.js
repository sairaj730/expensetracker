import { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/api/auth/signup", {
        email,
        password
      });

      // Automatically log the user in after successful signup
      handleLogin(response.data);
    } catch (error) {
      console.error("Signup failed", error);
      if (error.response && error.response.status === 400) {
        alert("An account with this email already exists. Please use a different email or log in.");
      } else {
        alert("Error signing up, please try again!");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>
        <form onSubmit={handleSignup} className="auth-form">
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="auth-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/credentials/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
