import { useState, useEffect } from "react";
import Navbar from "./NavBar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./credentials/Login";
import Signup from "./credentials/Signup";
import HomePage from "./home/HomePage";

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data exists in localStorage on initial load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    // Remove user data from localStorage
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/credentials/Login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/credentials/Signup" element={<Signup handleLogin={handleLogin} />} />
      </Routes>
    </>
  );
}

