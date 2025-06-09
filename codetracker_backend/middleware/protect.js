import jwt from "jsonwebtoken";
import {User} from "../models/users.js";
export const protect = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  // console.log("🔐 Incoming token:", token);

  if (!token) {
    // console.log("❌ No token provided");
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("✅ Token decoded:", decoded);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      // console.log("❌ User not found in DB");
      return res.status(401).json({ error: "User not found" });
    }
    next();
  } catch (err) {
    // console.log("❌ Token invalid or expired:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};
