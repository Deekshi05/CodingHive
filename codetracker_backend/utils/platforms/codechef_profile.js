import axios from "axios";
import { UserStats } from "../../models/userStats.js";
import { User } from "../../models/users.js";

export const getCodechefStats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const platform = "CodeChef";
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Get username from Users collection
    const user = await User.findById(userId);
    if (!user || !user.handles || !user.handles.get("codechef")) {
      return res.status(404).json({ error: "CodeChef username not found for this user." });
    }

    const username = user.handles.get("codechef");

    // Check if existing stats are fresh
    let stats = await UserStats.findOne({ userId, platform });
    if (stats && stats.lastFetched > oneDayAgo) {
      console.log("✅ Returning cached CodeChef stats");
      return res.json(stats);
    }

    // Fetch fresh data from CodeChef unofficial API
    const url = `https://codechef-api.vercel.app/handle/${username}`;
    const response = await axios.get(url);
    const data = response.data;

    const currentRating = data.currentRating;
    const highestRating = data.highestRating;

    // Calculate total submissions & activity dates
    const activityDates = new Set();
    let totalSubmissions = 0;
    data.heatMap.forEach(entry => {
      if (entry.value > 0) {
        activityDates.add(entry.date);
        totalSubmissions += entry.value;
      }
    });

    // Calculate streak
    let streak = 0;
    const currentDate = new Date();
    while (true) {
      const dateStr = currentDate.toISOString().split("T")[0];
      if (activityDates.has(dateStr)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    const newData = {
      userId,
      platform,
      currentRating,
      highestRating,
      problemsSolved: totalSubmissions,
      accuracy: null,
      streak,
      lastFetched: new Date(),
    };

    if (stats) {
      await UserStats.updateOne({ userId, platform }, newData);
    } else {
      stats = new UserStats(newData);
      await stats.save();
    }
     console.log(newData);
    console.log("🔄 CodeChef stats updated from API");
    return res.json(newData);
  } catch (error) {
    console.error("❌ CodeChef fetch error:", error.message);
    return res.status(500).json({ error: "Failed to fetch CodeChef stats." });
  }
};
