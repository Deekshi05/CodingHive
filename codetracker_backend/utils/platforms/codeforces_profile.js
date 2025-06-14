import axios from "axios";
import { UserStats } from "../../models/userStats.js";
import { User } from "../../models/users.js";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const getCodeforcesStats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const platform = "Codeforces";
    const now = new Date();
     console.log(userId);
    // Step 1: Fetch user
    const user = await User.findById(userId);
    if (!user || !user.handles || !user.handles.get("codeforces")) {
      return res.status(404).json({ error: "Codeforces username not found for this user." });
    }

    const username = user.handles.get("codeforces");
    console.log(username);
    // Step 2: Check existing stats
    const existing = await UserStats.findOne({ userId, platform });
    const isStale = !existing || (now - new Date(existing.lastFetched)) > ONE_DAY_MS;

    if (!isStale) {
      console.log("✅ Returning cached Codeforces data");
      return res.json(existing);
    }

    // Step 3: Fetch fresh data from Codeforces API
    const [userInfoRes, submissionsRes] = await Promise.all([
      axios.get(`https://codeforces.com/api/user.info?handles=${username}`),
      axios.get(`https://codeforces.com/api/user.status?handle=${username}`)
    ]);

    if (userInfoRes.data.status !== "OK" || submissionsRes.data.status !== "OK") {
      return res.status(500).json({ error: "Codeforces API returned an error." });
    }

    const userData = userInfoRes.data.result[0];
    const submissions = submissionsRes.data.result;

    // Step 4: Process submissions
    const solvedSet = new Set();
    const activeDays = new Set();
    let correct = 0;

    submissions.forEach((submission) => {
      const dateStr = new Date(submission.creationTimeSeconds * 1000).toISOString().split("T")[0];
      activeDays.add(dateStr);

      if (submission.verdict === "OK") {
        correct++;
        const key = `${submission.problem.contestId}-${submission.problem.index}`;
        solvedSet.add(key);
      }
    });

    const totalSubmissions = submissions.length;
    const accuracy = totalSubmissions ? (correct / totalSubmissions) * 100 : 0;

    // Step 5: Calculate streak
    let streak = 0;
    const current = new Date();
    while (true) {
      const dateStr = current.toISOString().split("T")[0];
      if (activeDays.has(dateStr)) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }

    // Step 6: Prepare new stats
    const newStats = {
      userId,
      platform,
      currentRating: userData.rating || null,
      highestRating: userData.maxRating || null,
      problemsSolved: solvedSet.size,
      accuracy: parseFloat(accuracy.toFixed(2)),
      streak,
      lastFetched: new Date(),
    };
    console.log(newStats);
    // Step 7: Save or update stats
    const updated = await UserStats.findOneAndUpdate(
      { userId, platform },
      newStats,
      { upsert: true, new: true }
    );

    console.log("📦 Updated Codeforces stats from API");
    return res.json(updated);
  } catch (error) {
    console.error("❌ Error in getCodeforcesStats:", error.message);
    return res.status(500).json({
      platform: "Codeforces",
      error: error.message || "Unknown error"
    });
  }
};
