import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import axios from "axios";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth status on mount and when location changes
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, [location]);

  const navLinkClass = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("accessToken");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className={navLinkClass("/")}>
        Home
      </Link>
      <Link to="/dashboard" className={navLinkClass("/dashboard")}>
        Dashboard
      </Link>
      <Link to="/profile" className={navLinkClass("/profile")}>
        Profile
      </Link>

      {!isLoggedIn ? (
        <>
          <Link to="/login" className={navLinkClass("/login")}>
            <FaSignInAlt style={{ marginRight: 5 }} />
            Login
          </Link>
          <Link to="/register" className={navLinkClass("/register")}>
            <FaUserPlus style={{ marginRight: 5 }} />
            Register
          </Link>
        </>
      ) : (
        <button
          onClick={handleLogout}
          className="nav-link logout-button"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#3e2c25",
            padding: 0,
            marginLeft: "10px",
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}
