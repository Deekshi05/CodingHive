import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../axiosclient.js";
import { HiLockClosed } from "react-icons/hi";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      await axiosClient.post(`/reset-password/${token}`, { password });
      alert("Password reset successful!");
      navigate("/login");
    } catch (err) {
      alert("Invalid or expired token");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Reset Password</h2>

        <div className="flex items-center border rounded-lg px-3 py-2 mb-4 shadow-sm bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
          <HiLockClosed className="text-gray-500 mr-2 text-xl" />
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full bg-transparent focus:outline-none text-sm"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleReset}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition duration-200"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
