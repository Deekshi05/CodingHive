import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PastContestsPage from "./pages/PastContestsPage";
import ForgotPassword from "./pages/forgotpassword";
import ResetPassword from "./pages/resetpassword";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/past-contests" element={<PastContestsPage />} />
      </Routes>
    </>
  );
}
