import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from "../axiosclient.js";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { HiMail, HiLockClosed } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axiosClient.post('/login', form);
      localStorage.setItem('accessToken', res.data.accessToken);
      setMessage('Login successful ✅');
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        setMessage("Google login failed: No credential received");
        return;
      }
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google User:", decoded);

      const res = await axiosClient.post('/google-login', {
        token: credentialResponse.credential,
      });

      localStorage.setItem('accessToken', res.data.accessToken);
      setMessage('Google login successful ✅');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setMessage('Google login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4">
      <div className="bg-[#1e293b] text-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-400">🔐 Login to Coding Hive</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 bg-[#0f172a]">
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
          
          <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 bg-[#0f172a]">
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

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm text-gray-300">Or login with Google:</div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setMessage('Google login failed')}
          />
        </div>

        <p className="text-center text-sm text-red-400">{message}</p>
      </div>
    </div>
  );
}

export default Login;
