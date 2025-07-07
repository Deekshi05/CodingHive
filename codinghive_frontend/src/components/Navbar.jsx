import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import axiosClient from "../axiosclient";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, [location]);

  const navLinkClass = (path) =>
    `px-4 py-2 rounded-lg text-base font-medium tracking-wide transition-all duration-200 ${
      location.pathname === path
        ? "text-blue-400 bg-white/10 shadow-inner"
        : "text-white hover:text-blue-300 hover:bg-white/5"
    }`;

  const handleLogout = async () => {
    try {
      await axiosClient.post("/logout", {}, { withCredentials: true });
      localStorage.removeItem("accessToken");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
 <nav className="w-full px-6 py-4 bg-[#0f172a] shadow-sm flex items-center justify-between font-mono text-white text-base">
  <div className="text-2xl font-extrabold tracking-widest text-white">
    Coding Hive
  </div>
  
  <div className="flex space-x-6">
    <Link to="/" className={navLinkClass("/")}>Home</Link>
    <Link to="/dashboard" className={navLinkClass("/dashboard")}>Dashboard</Link>
    <Link to="/past-contests" className={navLinkClass("/past-contests")}>ContestDiscussions</Link>
    <Link to="/profile" className={navLinkClass("/profile")}>Profile</Link>
  </div>

  <div className="flex space-x-4">
    {!isLoggedIn ? (
      <>
        <Link
          to="/login"
          className="flex items-center gap-2 text-white hover:text-gray-200 transition-all text-base"
        >
          <FaSignInAlt />
          <span>Login</span>
        </Link>
        <Link
          to="/register"
          className="flex items-center gap-2 text-white hover:text-gray-200 transition-all text-base"
        >
          <FaUserPlus />
          <span>Register</span>
        </Link>
      </>
    ) : (
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-white hover:text-red-400 transition-all text-base"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    )}
  </div>
</nav>
  );
}
