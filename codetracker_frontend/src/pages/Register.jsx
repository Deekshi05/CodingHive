import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from "../axiosclient.js";
import { FaUser, FaEnvelope, FaLock, FaCode } from 'react-icons/fa';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    handles: {
      leetcode: '',
      codeforces: '',
      codechef: ''
    }
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    if (['leetcode', 'codeforces', 'codechef'].includes(name)) {
      setForm(prev => ({
        ...prev,
        handles: { ...prev.handles, [name]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const filteredHandles = Object.fromEntries(
      Object.entries(form.handles).filter(([_, val]) => val.trim() !== '')
    );

    try {
      const res = await axiosClient.post('/register', {
        username: form.username,
        email: form.email,
        password: form.password,
        handles: filteredHandles
      });

      setMessage(res.data.message || 'Registered successfully');
      if (res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
      }
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-2xl shadow-lg text-white">
        <h2 className="text-3xl font-bold text-blue-400 text-center mb-6">📝 Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3 bg-[#0f172a] p-3 rounded-xl">
            <FaUser />
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={form.username}
              required
              className="bg-transparent w-full outline-none text-white"
            />
          </div>

          <div className="flex items-center gap-3 bg-[#0f172a] p-3 rounded-xl">
            <FaEnvelope />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
              required
              className="bg-transparent w-full outline-none text-white"
            />
          </div>

          <div className="flex items-center gap-3 bg-[#0f172a] p-3 rounded-xl">
            <FaLock />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
              required
              className="bg-transparent w-full outline-none text-white"
            />
          </div>

          <h4 className="text-blue-300 font-semibold mt-6">Optional Handles</h4>

          {["leetcode", "codeforces", "codechef"].map((platform) => (
            <div key={platform} className="flex items-center gap-3 bg-[#0f172a] p-3 rounded-xl">
              <FaCode />
              <input
                name={platform}
                placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Handle`}
                onChange={handleChange}
                value={form.handles[platform]}
                className="bg-transparent w-full outline-none text-white"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 transition-colors rounded-xl mt-4 font-semibold text-white"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-blue-300">{message}</p>
        )}
      </div>
    </div>
  );
}

export default Register;
