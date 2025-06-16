import React, { useState } from "react";
import axiosClient from "../axiosclient.js";
import { HiMail } from "react-icons/hi";
import { FaLink } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [link, setLink] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await axiosClient.post("/forgot-password", { email });
      setLink(res.data.resetLink);
    } catch (err) {
      alert("User not found");
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-all duration-200"
        >
          Request Reset Link
        </button>

        {link && (
          <div className="mt-6 bg-green-100 p-4 rounded-lg text-sm break-words border border-green-300 text-gray-800">
            <p className="font-medium flex items-center text-green-700 mb-1">
              <FaLink className="mr-2" /> Reset Link (for testing):
            </p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all hover:text-blue-800"
            >
              {link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
