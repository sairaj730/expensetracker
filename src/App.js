import { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./credentials/Login";
import Signup from "./credentials/Signup";
import HomePage from "./home/HomePage";
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="app-container">
      <Sidebar user={user} handleLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/credentials/Login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/credentials/Signup" element={<Signup handleLogin={handleLogin} />} />
        </Routes>
      </main>
    </div>
  );
}