import { UpcomingContest } from "../models/upcomingContests.js";
import { ContestDiscussion } from "../models/contestDiscussion.js";
import axios from "axios";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export const fetchYoutubeDiscussions = async (req, res) => {
  try {
    const now = new Date();
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago

    const contestsThisMonth = await UpcomingContest.find({
      startTime: { $gte: firstOfMonth, $lte: now },
    });

    const contestIds = contestsThisMonth.map((contest) =>
      contest._id.toString()
    );

    const existingDiscussions = await ContestDiscussion.find({
      contestId: { $in: contestIds },
    });

    const discussedMap = new Map();
    const fetchTimes = new Map();

    for (const doc of existingDiscussions) {
      discussedMap.set(doc.contestId.toString(), doc.youtubeLinks);
      fetchTimes.set(doc.contestId.toString(), doc.lastFetched || new Date(0));
    }

    for (const contest of contestsThisMonth) {
      const contestId = contest._id.toString();
      const platform = contest.platform.trim();
      const contestName = contest.contestName.trim();
      const keyword = contestName.toLowerCase();

      const existingLinks = discussedMap.get(contestId) || [];
      const lastFetched = fetchTimes.get(contestId) || new Date(0);

      const shouldFetch =
        contest.startTime < now &&
        (existingLinks.length < 3 || lastFetched < oneDayAgo);

      if (shouldFetch) {
        try {
          const additionalKeywords = [
            "solution",
            "editorial",
            "discussion",
            "contest",
            platform,
          ];
          const searchQuery = contestName;

          const searchResponse = await axios.get(
            "https://www.googleapis.com/youtube/v3/search",
            {
              params: {
                key: YOUTUBE_API_KEY,
                q: searchQuery,
                part: "snippet",
                type: "video",
                maxResults: 25,
                videoEmbeddable: "true",
                safeSearch: "strict",
                order: "relevance",
              },
            }
          );

          const videos = searchResponse.data.items.filter(
            (item) => item.id.kind === "youtube#video"
          );

          const processedContestName = contestName
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

          const matchedVideos = videos.filter((video) => {
            const processedTitle = video.snippet.title
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "");
            return processedTitle.includes(processedContestName);
          });

          if (matchedVideos.length === 0) continue;

          const videoIds = matchedVideos
            .map((video) => video.id.videoId)
            .join(",");

          const statsResponse = await axios.get(
            "https://www.googleapis.com/youtube/v3/videos",
            {
              params: {
                key: YOUTUBE_API_KEY,
                id: videoIds,
                part: "statistics,snippet",
              },
            }
          );

          const videosWithStats = statsResponse.data.items
            .map((video) => ({
              id: video.id,
              title: video.snippet.title,
              views: parseInt(video.statistics.viewCount || "0", 10),
            }))
            .sort((a, b) => b.views - a.views)
            .slice(0, 3);

          const youtubeLinks = videosWithStats.map(
            (video) => `https://www.youtube.com/watch?v=${video.id}`
          );

          if (youtubeLinks.length > 0) {
            if (discussedMap.has(contestId)) {
              await ContestDiscussion.updateOne(
                { contestId: contest._id },
                {
                  $set: {
                    youtubeLinks,
                    lastFetched: new Date(),
                  },
                }
              );
            } else {
              await ContestDiscussion.create({
                contestId: contest._id,
                youtubeLinks,
                lastFetched: new Date(),
              });
            }

            discussedMap.set(contestId, youtubeLinks);
            fetchTimes.set(contestId, new Date());
          }
        } catch (err) {
          console.error("❌ Error in fetching contest discussions:", err.message);
        }
      }
    }

    const result = contestsThisMonth
      .sort((a, b) => b.startTime - a.startTime)
      .map((contest) => ({
        name: contest.contestName,
        platform: contest.platform,
        startTime: contest.startTime,
        youtubeLinks: (discussedMap.get(contest._id.toString()) || []).slice(
          0,
          3
        ),
      }));

    return res.json({
      message: "YouTube discussion links for contests in the current month",
      data: result,
    });
  } catch (err) {
    console.error("❌ Server error in main handler:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
