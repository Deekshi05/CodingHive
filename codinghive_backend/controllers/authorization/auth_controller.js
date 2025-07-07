import { User } from "../../models/users.js";
import { sendLoginEmail } from "../../utils/sendLoginEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helpers
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const generateAccessToken = ({ userId, username, email }) =>
  jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });

const generateRefreshToken = ({ userId, username, email }) =>
  jwt.sign({ userId, username, email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });

const sendTokenResponse = (res, accessToken, refreshToken, status = 200) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  return res.status(status).json({ accessToken });
};

// Controllers
export const RegisterController = async (req, res) => {
  const { username, email, password, handles } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      handles: handles || {},
      resetToken: "",
      resetTokenExpiry: null,
    });

    await newUser.save();
    await sendLoginEmail(newUser.email, newUser.username);

    const payload = {
      userId: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return sendTokenResponse(res, accessToken, refreshToken, 201);
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const LoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    await sendLoginEmail(user.email, user.username);

    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return sendTokenResponse(res, accessToken, refreshToken);
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const refreshTokenController = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token)
    return res.status(401).json({ message: "Refresh Token not found" });

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Refresh Token" });

    const accessToken = generateAccessToken({
      userId: decoded.userId,
      username: decoded.username,
      email: decoded.email,
    });

    return res.json({ accessToken });
  });
};

export const LogoutController = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });
  return res.json({ message: "Logged out successfully" });
};

export const GoogleLoginController = async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      // Create new user with dummy hashed password
      user = new User({
        username: name,
        email,
        password: await hashPassword(Math.random().toString(36).slice(-8)),
        handles: {},
      });
      await user.save();
    }
    await sendLoginEmail(user.email, user.username);
    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return sendTokenResponse(res, accessToken, refreshToken);
  } catch (err) {
    console.error("Google login error:", err);
    return res.status(401).json({ message: "Invalid Google token" });
  }
};
