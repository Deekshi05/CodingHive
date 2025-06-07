import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from "../axiosclient.js"

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axiosClient.post('/register', form);
      setMessage(res.data.message || 'Registered successfully');
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} value={form.username} required />
        <br />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} value={form.email} required />
        <br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} value={form.password} required />
        <br />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;
