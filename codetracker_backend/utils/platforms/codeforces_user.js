import axios from "axios";
import { UserStats } from "../../models/userStats.js"; // adjust the path if needed

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const getCodeforcesStats = async (userId, username) => {
  try {
    // Step 1: Check existing stats in DB
    const existing = await UserStats.findOne({ userId, platform: "Codeforces" });

    const now = new Date();
    const isStale = !existing || (now - new Date(existing.lastFetched)) > ONE_DAY_MS;

    if (!isStale) {
      console.log("✅ Returning cached Codeforces data");
      return existing;
    }

    // Step 2: Fetch fresh data from Codeforces
    const [userInfoRes, submissionsRes] = await Promise.all([
      axios.get(`https://codeforces.com/api/user.info?handles=${username}`),
      axios.get(`https://codeforces.com/api/user.status?handle=${username}`)
    ]);

    if (userInfoRes.data.status !== "OK" || submissionsRes.data.status !== "OK") {
      throw new Error("Codeforces API error");
    }

    const user = userInfoRes.data.result[0];
    const submissions = submissionsRes.data.result;

    // Process submissions
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

    // Calculate streak
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

    // Prepare the stats object
    const stats = {
      userId,
      platform: "Codeforces",
      currentRating: user.rating || null,
      highestRating: user.maxRating || null,
      problemsSolved: solvedSet.size,
      accuracy: parseFloat(accuracy.toFixed(2)),
      streak,
      lastFetched: new Date()
    };

    // Step 3: Update or insert in database
    const updated = await UserStats.findOneAndUpdate(
      { userId, platform: "Codeforces" },
      stats,
      { upsert: true, new: true }
    );

    console.log("📦 Updated Codeforces stats from API");
    return updated;

  } catch (error) {
    console.error("❌ Error in getCodeforcesStats:", error.message);
    throw error;
  }
};
