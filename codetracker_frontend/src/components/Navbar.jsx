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
      ? "nav-link text-blue-600 font-semibold"
      : "nav-link text-gray-700 hover:text-blue-500";

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
    <nav className="flex items-center space-x-6 bg-gray-100 p-4 shadow-md">
      <Link to="/" className={navLinkClass("/")}>
        Home
      </Link>
      <Link to="/dashboard" className={navLinkClass("/dashboard")}>
        Dashboard
      </Link>
      <Link to="/profile" className={navLinkClass("/profile")}>
        Profile
      </Link>

      <div className="ml-auto flex items-center space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className={navLinkClass("/login") + " flex items-center"}>
              <FaSignInAlt className="mr-1" />
              Login
            </Link>
            <Link to="/register" className={navLinkClass("/register") + " flex items-center"}>
              <FaUserPlus className="mr-1" />
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-600 font-semibold cursor-pointer flex items-center"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
