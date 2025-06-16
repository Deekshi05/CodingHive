import {User} from "../../models/users.js";
import crypto from "crypto";

export const forgotpassword=async(req,res)=>{
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  console.log(email);
  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000; 
  await user.save();

  const resetLink = `http://localhost:5173/reset-password/${token}`;
  res.json({ resetLink });
}

export const resetpassword=async(req,res)=>{
    const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  user.password = password;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
}