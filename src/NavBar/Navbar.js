import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">Expense Tracker</div>

      {/* Hamburger */}
      <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      {/* Links */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <li>
            <button onClick={handleLogout} className="btn-outline">
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/credentials/Login" className="btn-outline">
                Login
              </Link>
            </li>
            <li>
              <Link to="/credentials/Signup" className="btn-filled">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
