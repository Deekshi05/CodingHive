import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  handles: {
    type: Map,
    of: String,
    default: {}
  },
  resetToken: String,
  resetTokenExpiry: Date,
  createdAt: { type: Date, default: Date.now }
});

export const User =mongoose.model('User', userSchema);

