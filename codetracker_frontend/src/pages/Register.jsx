import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from "../axiosclient.js";

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

    // Update handles if it's a platform field
    if (['leetcode', 'codeforces', 'codechef'].includes(name)) {
      setForm(prev => ({
        ...prev,
        handles: {
          ...prev.handles,
          [name]: value
        }
      }));
    } else {
      // Update username, email, password
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Filter out empty handles
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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={form.username}
          required
        /><br />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          required
        /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          required
        /><br />

        <h4>Optional Platform Handles</h4>

        <input
          name="leetcode"
          placeholder="LeetCode Handle"
          onChange={handleChange}
          value={form.handles.leetcode}
        /><br />

        <input
          name="codeforces"
          placeholder="Codeforces Handle"
          onChange={handleChange}
          value={form.handles.codeforces}
        /><br />

        <input
          name="codechef"
          placeholder="CodeChef Handle"
          onChange={handleChange}
          value={form.handles.codechef}
        /><br />

        <button type="submit">Register</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default Register;
