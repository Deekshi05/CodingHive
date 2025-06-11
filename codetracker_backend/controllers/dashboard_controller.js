import { getCodeChefContests } from "../utils/platforms/codechef.js";
import { getCodeforcesContests } from "../utils/platforms/codeforces.js";
import { getLeetCodeContests } from "../utils/platforms/leetcode.js";
import { UpcomingContest } from "../models/upcomingContests.js";

export const getupcomingcontests = async (req, res) => {
  try {
    const now = new Date(); // ❗ Added this
    const oneDayMs = 24 * 60 * 60 * 1000; // ❗ Added this
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0); // 00:00:00.000 today

    let contests = await UpcomingContest.find({ startTime: { $gte: startOfToday } })
      .sort({ startTime: 1 })
      .limit(5);

    if (
      contests.length === 0 ||
      !contests[0].lastUpdated ||
      now - new Date(contests[0].lastUpdated) > oneDayMs
    ) {
      console.log("Updating contests since data is stale or missing...");

      // Fetch from platforms
      await getCodeChefContests();
      await getCodeforcesContests();
      await getLeetCodeContests();

      // Re-query after update
      contests = await UpcomingContest.find({ startTime: { $gte: startOfToday } })
        .sort({ startTime: 1 })
        .limit(5);

      console.log("✅ Fresh contests fetched");
    }

    // Fetch all contests (for calendar or admin)
    const allContests = await UpcomingContest.find().sort({ startTime: 1 });

    // Format contest dates to ISO
    const formattedUpcoming = contests.map((contest) => ({
      ...contest._doc,
      startTime: new Date(contest.startTime).toISOString(),
    }));

    const formattedAll = allContests.map((contest) => ({
      ...contest._doc,
      startTime: new Date(contest.startTime).toISOString(),
    }));

    return res.json({
      upcomingContests: formattedUpcoming,
      allContests: formattedAll,
    });
  } catch (err) {
    console.error("❌ Error fetching contests:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
