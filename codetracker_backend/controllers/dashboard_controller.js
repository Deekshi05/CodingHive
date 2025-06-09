// controllers/dashboard_controller.js

import { getCodeChefContests } from "../utils/platforms/codechef.js";
import { getCodeforcesContests } from "../utils/platforms/codeforces.js";
import { getLeetCodeContests } from "../utils/platforms/leetcode.js";
import { UpcomingContest } from "../models/upcomingContests.js";

export const getupcomingcontests = async (req, res) => {
  try {
    const freshContests = await UpcomingContest.find().sort({ startTime: 1 }).limit(5);

    const now = new Date();
    const oneDayMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (
      freshContests.length === 0 ||
      !freshContests[0].lastUpdated ||
      now - freshContests[0].lastUpdated > oneDayMs
    ) {
      await getCodeChefContests();
      await getCodeforcesContests();
      await getLeetCodeContests();

     const freshContests = await UpcomingContest.find().sort({ startTime: 1 }).limit(5);
      console.log("fresh contests fetched");
      return res.json(freshContests);
    }

    // Return cached data if fresh
    console.log(freshContests);
    return res.json(freshContests);
  } catch (err) {
    console.error("Error fetching upcoming contests:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
