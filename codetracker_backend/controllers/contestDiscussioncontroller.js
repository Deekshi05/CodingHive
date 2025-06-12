import { UpcomingContest } from "../models/upcomingContests.js";
import { ContestDiscussion } from "../models/contestDiscussion.js";
import axios from "axios";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export const fetchYoutubeDiscussions = async (req, res) => {
  try {
    const now = new Date();
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const pastContests = await UpcomingContest.find({
      startTime: { $gte: firstOfMonth, $lt: now },
    });

    const contestIds = pastContests.map((contest) => contest._id.toString());

    const existingDiscussions = await ContestDiscussion.find({
      contestId: { $in: contestIds },
    });

    const discussedMap = new Map();
    for (const doc of existingDiscussions) {
      discussedMap.set(doc.contestId.toString(), doc.youtubeLinks);
    }

    const missingContests = pastContests.filter(
      (contest) => !discussedMap.has(contest._id.toString())
    );

    for (const contest of missingContests) {
      const platform = contest.platform.trim();
      const contestName = contest.contestName.trim();
      const year = contest.startTime.getFullYear();

      const searchQuery = `${platform} ${contestName} ${year}`;

      try {
        const searchResponse = await axios.get("https://www.googleapis.com/youtube/v3/search", {
          params: {
            key: YOUTUBE_API_KEY,
            q: searchQuery,
            part: "snippet",
            type: "video",
            maxResults: 3,
            safeSearch: "strict",
          },
        });

        const topVideos = searchResponse.data.items.filter(item => item.id.kind === "youtube#video");

        const youtubeLinks = topVideos.map(
          (item) => `https://www.youtube.com/watch?v=${item.id.videoId}`
        );

        if (youtubeLinks.length > 0) {
          await ContestDiscussion.create({
            contestId: contest._id,
            youtubeLinks,
            lastFetched: new Date(),
          });

          discussedMap.set(contest._id.toString(), youtubeLinks);
        }
      } catch (err) {
        console.error(`❌ YouTube fetch error for "${contest.contestName}":`, err.message);
      }
    }

    const result = pastContests.map((contest) => ({
      name: contest.contestName,
      platform: contest.platform,
      startTime: contest.startTime,
      youtubeLinks: (discussedMap.get(contest._id.toString()) || []).slice(0, 3),
    }));

    // console.log(result);

    return res.json({
      message: "Top 3 YouTube results per contest (exact order from YouTube)",
      data: result,
    });

  } catch (err) {
    console.error("❌ Error in fetching contest discussions:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
