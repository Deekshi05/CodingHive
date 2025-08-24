import jwt from "jsonwebtoken";
import { User } from "../models/users.js";

export const protect = async (req, res, next) => {
  let token;

  // Try to get token from cookies first
  token = req.cookies.accessToken;

  // If not in cookies, try to get from Authorization header
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      return res.status(401).json({ error: "User not found" });
    }
    next();
  } catch (err) {
    console.log("Token verification error:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};
