import axios from "axios";
import { UserStats } from "../../models/userStats.js";
import { User } from "../../models/users.js";

export const getLeetcodeStats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const platform = "LeetCode";
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Get username from Users collection
    const user = await User.findById(userId);
    if (!user || !user.handles || !user.handles.get("leetcode")) {
      return res.status(404).json({ error: "LeetCode username not found for this user." });
    }

    const username = user.handles.get("leetcode");

    // Check if existing stats are fresh
    let stats = await UserStats.findOne({ userId, platform });
    if (stats && stats.lastFetched > oneDayAgo) {
      console.log("✅ Returning cached LeetCode stats");
      return res.json(stats);
    }

    // Fetch fresh data from LeetCode API
    const profileUrl = `https://alfa-leetcode-api.onrender.com/${username}`;
    const calendarUrl = `https://alfa-leetcode-api.onrender.com/${username}/calendar`;

    const [profileRes, calendarRes] = await Promise.all([
      axios.get(profileUrl),
      axios.get(calendarUrl),
    ]);

    const profileData = profileRes.data;
    const calendarData = calendarRes.data.submissionCalendar;

    const currentRating = profileData?.contestRating?.rating || null;
    const highestRating = profileData?.contestRating?.topRating || null;

    // Calculate total submissions
    const activityDates = new Set();
    let totalSubmissions = 0;
    for (const [timestamp, count] of Object.entries(calendarData)) {
      const date = new Date(parseInt(timestamp) * 1000).toISOString().split("T")[0];
      activityDates.add(date);
      totalSubmissions += count;
    }

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
      problemsSolved: profileData.totalSolved || totalSubmissions,
      accuracy: null, // LeetCode API does not provide accuracy
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
    console.log("🔄 LeetCode stats updated from API");
    return res.json(newData);
  } catch (error) {
    console.error("❌ LeetCode fetch error:", error.message);
    return res.status(500).json({ error: "Failed to fetch LeetCode stats." });
  }
};
