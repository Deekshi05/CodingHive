import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosclient.js";
import { FaUser, FaEnvelope, FaLock, FaCode } from "react-icons/fa";
import { toast } from "react-toastify";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    handles: {
      leetcode: "",
      codeforces: "",
      codechef: "",
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["leetcode", "codeforces", "codechef"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        handles: { ...prev.handles, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredHandles = Object.fromEntries(
      Object.entries(form.handles).filter(([_, val]) => val.trim() !== "")
    );

    try {
      await axiosClient.post(
        "/register",
        {
          username: form.username,
          email: form.email,
          password: form.password,
          handles: filteredHandles,
        },
        { withCredentials: true }
      );

      toast.success("🎉 Registered successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 font-mono">
      <div className="w-full max-w-md bg-[#111827] border border-white/10 p-6 rounded-2xl shadow-xl transition-transform transform hover:-translate-y-1 hover:shadow-blue-500/30 space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-400">
          📝 Register to Coding Hive
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 bg-[#0f172a] focus-within:ring-2 focus-within:ring-blue-500">
            <FaUser className="text-gray-400 mr-2" />
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={form.username}
              required
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 bg-[#0f172a] focus-within:ring-2 focus-within:ring-blue-500">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
              required
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-700 rounded-lg px-3 py-2 bg-[#0f172a] focus-within:ring-2 focus-within:ring-blue-500">
            <FaLock className="text-gray-400 mr-2" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
              required
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          {/* Optional Handles */}
          <h4 className="text-blue-400 font-semibold mt-4 text-sm">
            Optional Coding Handles
          </h4>

          {["leetcode", "codeforces", "codechef"].map((platform) => (
            <div
              key={platform}
              className="flex items-center border border-gray-700 rounded-lg px-3 py-2 bg-[#0f172a] focus-within:ring-2 focus-within:ring-blue-500"
            >
              <FaCode className="text-gray-400 mr-2" />
              <input
                name={platform}
                placeholder={`${
                  platform.charAt(0).toUpperCase() + platform.slice(1)
                } Handle`}
                onChange={handleChange}
                value={form.handles[platform]}
                className="bg-transparent outline-none text-white w-full"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white py-2 rounded-lg font-semibold transition-all mt-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
