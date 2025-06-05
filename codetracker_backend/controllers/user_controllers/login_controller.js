import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Token from '../models/Token.js';

dotenv.config();
const router = express.Router();

function generateAccessToken(user) {
  return jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.REFRESH_TOKEN_SECRET);
}

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await Token.create({ userId: user._id, token: refreshToken });

    res.json({ accessToken, refreshToken });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/token/refresh', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'Refresh token required' });

  try {
    const storedToken = await Token.findOne({ token });
    if (!storedToken) return res.status(403).json({ message: 'Invalid refresh token' });

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid refresh token' });

      const accessToken = generateAccessToken(user);
      res.json({ accessToken });
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Token required' });

  try {
    await Token.deleteOne({ token });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
