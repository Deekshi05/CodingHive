import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../axiosclient.js";
import { HiMail, HiLockClosed } from "react-icons/hi";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/login", form);
      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success("Login successful ✅");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axiosClient.post("/google-login", {
        credential: credentialResponse.credential,
      });
      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success("Google login successful ✅");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Google login failed");
    }
  };

  const handleGoogleFailure = () => {
    toast.error("Google login failed");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 font-mono">
      <div className="w-full max-w-md bg-[#111827] border border-white/10 p-6 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-400">
          🔐 Login to Coding Hive
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 bg-[#0f172a]">
            <HiMail className="text-gray-400 mr-2" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 bg-[#0f172a]">
            <HiLockClosed className="text-gray-400 mr-2" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          <div className="text-right text-sm text-blue-400 hover:underline">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-center mt-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            width="100%"
          />
        </div>

        <div className="text-center text-sm text-gray-300 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
