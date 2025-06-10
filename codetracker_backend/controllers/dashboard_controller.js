import { getCodeChefContests } from "../utils/platforms/codechef.js";
import { getCodeforcesContests } from "../utils/platforms/codeforces.js";
import { getLeetCodeContests } from "../utils/platforms/leetcode.js";
import { UpcomingContest } from "../models/upcomingContests.js";

export const getupcomingcontests = async (req, res) => {
  try {
    const now = new Date();
    const oneDayMs = 24 * 60 * 60 * 1000;

    let contests = await UpcomingContest.find({ startTime: { $gt: now } })
      .sort({ startTime: 1 })
      .limit(5);

    if (
      contests.length === 0 ||
      !contests[0].lastUpdated ||
      now - contests[0].lastUpdated > oneDayMs
    ) {
      await getCodeChefContests();
      await getCodeforcesContests();
      await getLeetCodeContests();

      contests = await UpcomingContest.find({ startTime: { $gt: now } })
        .sort({ startTime: 1 })
        .limit(5);

      console.log("Fresh contests fetched");
    }

    // Fetch all contests for calendar view or admin reference
    const allContests = await UpcomingContest.find().sort({ startTime: 1 });

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
    console.error("Error fetching contests:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
