import { User } from "../models/users.js"
import {UserStats} from "../models/userStats.js";

export const updateUserHandle = async (req, res) => {
  const { userId } = req.params;
  const { platform, handle } = req.body;

  if (!platform || !handle) {
    return res.status(400).json({ error: "Platform and handle are required" });
  }

  try {
    // 1. Update handle in User collection
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.handles.set(platform, handle);
    await user.save();

    // 2. Update handle in UserStats collection
    let stats = await UserStats.findOne({ userId });

    if (!stats) {
      stats = new UserStats({
        userId,
        [platform]: { handle },
      });
    } else {
      stats[platform] = {
        ...(stats[platform] || {}),
        handle,
      };
    }

    await stats.save();

    res.status(200).json({
      message: "Handle updated successfully",
      userHandles: user.handles,
      stats,
    });
  } catch (error) {
    console.error("Error updating handle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

