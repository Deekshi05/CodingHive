import { UserStats } from "../models/userStats.js";
import { User } from "../models/users.js";
import { getCodechefStats } from "../utils/platforms/codechef_stats.js";
import { getCodeforcesStats } from "../utils/platforms/codeforces_stats.js";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const fetchUserStats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user || !user.handles) {
      return res.status(404).json({ error: "User not found or handles missing." });
    }

    const platforms = ["Codeforces", "CodeChef"];
    const result = {};

    for (const platform of platforms) {
      const handle = user.handles.get(platform.toLowerCase()); // e.g. 'codeforces'
      if (!handle) {
        result[platform] = { error: `${platform} handle not found.` };
        continue;
      }

      const existing = await UserStats.findOne({ userId, platform });
      const isStale = !existing || (Date.now() - new Date(existing.lastFetched)) > ONE_DAY_MS;

      if (!isStale) {
        result[platform] = existing;
        continue;
      }

      let newStats = null;

      if (platform === "Codeforces") {
        newStats = await getCodeforcesStats(handle, userId); // return stats object
      } else if (platform === "CodeChef") {
        newStats = await getCodechefStats(handle, userId);
      }

      if (newStats) {
        const updated = await UserStats.findOneAndUpdate(
          { userId, platform },
          newStats,
          { new: true, upsert: true }
        );
        result[platform] = updated;
      } else {
        result[platform] = { error: `Failed to fetch ${platform} data.` };
      }
    }

    res.json(result);

  } catch (error) {
    console.error("❌ Error fetching user stats:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
