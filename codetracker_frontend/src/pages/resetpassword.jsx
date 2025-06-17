import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../axiosclient.js";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      await axiosClient.post(`/reset-password/${token}`, { password });
      setMessage("Password reset successful!");
      setError("");
      setTimeout(() => navigate("/login"), 2000); // redirect after 2s
    } catch (err) {
      setError("Invalid or expired token");
      setMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0e1b30] font-mono">
      <div className="bg-gradient-to-br from-white via-blue-100 to-blue-200 p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-200">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-800 tracking-wide">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full mb-4 px-4 py-2 rounded-lg border border-blue-300 focus:outline-none text-sm text-gray-800 placeholder-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-all duration-200"
        >
          Reset Password
        </button>

        {message && (
          <p className="mt-4 text-green-700 bg-green-100 p-3 rounded-lg text-sm text-center">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-4 text-red-700 bg-red-100 p-3 rounded-lg text-sm text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
