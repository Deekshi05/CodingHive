import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"; // Import custom CSS

export default function Navbar() {
  const location = useLocation();

  const navLinkClass = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <Link to="/" className={navLinkClass("/")}>Home</Link>
      <Link to="/dashboard" className={navLinkClass("/dashboard")}>Dashboard</Link>
      <Link to="/profile" className={navLinkClass("/profile")}>Profile</Link>
      <Link to="/login" className={navLinkClass("/login")}>Login</Link>
      <Link to="/register" className={navLinkClass("/register")}>Register</Link>
    </nav>
  );
}
