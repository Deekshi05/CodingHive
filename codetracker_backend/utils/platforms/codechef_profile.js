import axios from "axios";
import { UserStats } from "../models/UserStats.js"; // Adjust path if needed

export const fetchCodechefProfile = async (userId, username) => {
  try {
    const platform = "CodeChef";
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Check if existing stats are fresh
    let stats = await UserStats.findOne({ userId, platform });
    if (stats && stats.lastFetched > oneDayAgo) {
      console.log("✅ Returning cached CodeChef stats");
      return stats;
    }

    // Fetch fresh data from CodeChef unofficial API
    const url = `https://codechef-api.vercel.app/handle/${username}`;
    const response = await axios.get(url);
    const data = response.data;

    const currentRating = data.currentRating;
    const highestRating = data.highestRating;

    // Calculate total submissions & activity dates
    const today = new Date().toISOString().split('T')[0];
    const activityDates = new Set();
    let totalSubmissions = 0;

    data.heatMap.forEach(entry => {
      if (entry.value > 0) {
        activityDates.add(entry.date);
        totalSubmissions += entry.value;
      }
    });

    // Streak calculation
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

    // No accuracy field in API
    const accuracy = null;

    const newData = {
      userId,
      platform,
      currentRating,
      highestRating,
      problemsSolved: totalSubmissions,
      accuracy,
      streak,
      lastFetched: new Date(),
    };

    if (stats) {
      // Update if exists
      await UserStats.updateOne({ userId, platform }, newData);
    } else {
      // Insert new if doesn't exist
      stats = new UserStats(newData);
      await stats.save();
    }

    console.log("🔄 CodeChef stats updated from API");
    return newData;
  } catch (error) {
    console.error("❌ CodeChef fetch error:", error.message);
    return {
      platform: "CodeChef",
      error: error.message || "Unknown error",
    };
  }
};
