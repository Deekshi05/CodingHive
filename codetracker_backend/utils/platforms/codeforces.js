import axios from "axios";
import mongoose from "mongoose";
import { UpcomingContest } from "../../models/upcomingContests.js";
import { connectClient } from "../../config/mongodb_config.js";


const API_USERNAME = "Deekshu@04";
const API_KEY = "5f077a631060729e5789b49b4bed4df99ba8281f";

export const getCodeforcesContests=async() =>{
  try {
    const now = new Date().toISOString();

    const response = await axios.get("https://clist.by/api/v4/contest/", {
      headers: {
        Authorization: `ApiKey ${API_USERNAME}:${API_KEY}`,
      },
      params: {
        resource_id: 1,
        start__gte: now,
        order_by: "start",
        limit: 3,
      },
    });

    console.log("✅ Data fetched from Clist");

    const contests = response.data.objects.map(contest => {
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
      "❌ Failed to fetch or save Codeforces contests:",
      error.response?.status,
      error.response?.data || error.message
    );
  }
}


