import React, { useState } from "react";
import axiosClient from "../axiosclient.js";
import { HiMail } from "react-icons/hi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await axiosClient.post("/forgot-password", { email });
      setMessage(res.data.message);
      setError(null);
    } catch (err) {
      setMessage(null);
      setError("User not found");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0e1b30] font-mono">
      <div className="bg-gradient-to-br from-white via-blue-100 to-blue-200 p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-200">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-800 tracking-wide">
          Forgot Password
        </h2>

        <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 mb-4 shadow-sm bg-white focus-within:ring-2 focus-within:ring-blue-400">
          <HiMail className="text-blue-500 mr-2 text-xl" />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-transparent focus:outline-none text-sm text-gray-800 placeholder-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-all duration-200"
        >
          Request Reset Link
        </button>

        {message && (
          <div className="mt-4 text-green-700 bg-green-100 p-3 rounded-lg border border-green-300 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-700 bg-red-100 p-3 rounded-lg border border-red-300 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
