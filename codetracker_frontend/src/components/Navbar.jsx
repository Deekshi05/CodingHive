import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import axios from "axios";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, [location]);

  const navLinkClass = (path) =>
    location.pathname === path
      ? "text-green-400 font-semibold"
      : "text-gray-300 hover:text-green-300";

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
    <nav className="flex items-center px-6 py-4 bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] shadow-md">
      <div className="flex space-x-8 text-sm md:text-base font-medium">
        <Link to="/" className={navLinkClass("/")}>
          Home
        </Link>
        <Link to="/dashboard" className={navLinkClass("/dashboard")}>
          Dashboard
        </Link>
        <Link to="/profile" className={navLinkClass("/profile")}>
          Profile
        </Link>
      </div>

      <div className="ml-auto flex items-center space-x-6">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className={`flex items-center ${navLinkClass("/login")}`}>
              <FaSignInAlt className="mr-1" />
              Login
            </Link>
            <Link to="/register" className={`flex items-center ${navLinkClass("/register")}`}>
              <FaUserPlus className="mr-1" />
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-red-400 font-semibold cursor-pointer flex items-center"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
