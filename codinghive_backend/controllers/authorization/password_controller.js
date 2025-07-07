import {User} from "../../models/users.js";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../../utils/sendResetPasswordEmail.js";
import {hashPassword} from "./auth_controller.js";

export const forgotpassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  const expiry = Date.now() + 1000 * 60 * 60; // 1 hour

  user.resetToken = resetToken;
  user.resetTokenExpiry = expiry;
  await user.save();

  try {
  await sendResetPasswordEmail(email, resetToken);
  console.log("successfully sent msg");
} catch (error) {
  console.error("Failed to send email:", error);
  return res.status(500).json({ message: "Failed to send reset email" });
}
  res.json({ message: "Reset email sent successfully" });
};

export const resetpassword=async(req,res)=>{
    const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  user.password = await hashPassword(password);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
}