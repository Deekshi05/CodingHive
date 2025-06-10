import axios from "axios";
import { UpcomingContest } from "../../models/upcomingContests.js";

const API_USERNAME = "Deekshu@04";
const API_KEY = "5f077a631060729e5789b49b4bed4df99ba8281f";

export const getCodeforcesContests = async () => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const monthStart = new Date(year, month, 1).toISOString();         // e.g., 2025-06-01T00:00:00.000Z
    const monthEnd = new Date(year, month + 1, 1).toISOString();       // e.g., 2025-07-01T00:00:00.000Z

    const response = await axios.get("https://clist.by/api/v4/contest/", {
      headers: {
        Authorization: `ApiKey ${API_USERNAME}:${API_KEY}`,
      },
      params: {
        resource_id: 1, 
        start__gte: monthStart,
        start__lt: monthEnd,
        order_by: "start",
        limit: 100, // Fetch enough contests for the whole month
      },
    });

    console.log("✅ Codeforces contests fetched for current month");

    const contests = response.data.objects.map((contest) => {
      const startDate = new Date(contest.start);
      const endDate = new Date(contest.end);
      const durationMs = endDate - startDate;
      const durationMinutes = Math.floor(durationMs / (1000 * 60));

      return {
        platform: "Codeforces",
        contestName: contest.event,
        startTime: startDate,
        duration: durationMinutes,
        contestLink: contest.href,
        lastUpdated: new Date(),
      };
    });

    await UpcomingContest.deleteMany({ platform: "Codeforces" });
    await UpcomingContest.insertMany(contests);
   
    console.log("✅ Codeforces contests updated in DB.");
  } catch (error) {
    console.error(
      "❌ Failed to fetch/save Codeforces contests:",
      error.response?.status,
      error.response?.data || error.message
    );
  }
};
