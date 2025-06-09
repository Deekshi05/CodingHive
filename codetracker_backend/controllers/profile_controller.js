import { User } from "../models/users.js";
import * as leetcode from "../utils/platforms/leetcode_user.js";
import * as codeforces from "../utils/platforms/codeforces_user.js";

const platformModules = {
  leetcode,
  codeforces,
};

export const getUserProfileStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user || !user.handles) {
      return res.status(404).json({ error: "User or platform handles not found" });
    }

    // ✅ Normalize handles to plain object
    let handles = user.handles;

    if (handles instanceof Map) {
      handles = Object.fromEntries(handles); // Convert Map to plain object
    } else if (typeof handles.toObject === 'function') {
      handles = handles.toObject(); // Convert Mongoose subdocument to plain object
    }

    console.log("📦 Handles fetched:", handles);

    const platformStats = await Promise.all(
      Object.entries(handles)
        .filter(([_, username]) => !!username) // Skip empty usernames
        .map(async ([platform, username]) => {
          const module = platformModules[platform];
          if (module?.fetchProfile) {
            try {
              const data = await module.fetchProfile(username);
              return { platform, ...data };
            } catch (err) {
              return { platform, error: `Fetch failed: ${err.message}` };
            }
          } else {
            return { platform, error: "No fetch function available" };
          }
        })
    );

    console.log("📊 Platform stats result:", platformStats);
    return res.status(200).json({ platforms: platformStats });

  } catch (err) {
    console.error("❌ Error in getUserProfileStats:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
