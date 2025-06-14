import { UpcomingContest } from "../models/upcomingContests.js";
import { ContestDiscussion } from "../models/contestDiscussion.js";
import axios from "axios";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export const fetchYoutubeDiscussions = async (req, res) => {
  try {
    const now = new Date();
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Fetch all contests in the current month
    const contestsThisMonth = await UpcomingContest.find({
      startTime: { $gte: firstOfMonth, $lte: now },
    });

    const contestIds = contestsThisMonth.map(contest => contest._id.toString());

    // Fetch existing discussions
    const existingDiscussions = await ContestDiscussion.find({
      contestId: { $in: contestIds },
    });

    const discussedMap = new Map();
    for (const doc of existingDiscussions) {
      discussedMap.set(doc.contestId.toString(), doc.youtubeLinks);
    }

    for (const contest of contestsThisMonth) {
      const contestId = contest._id.toString();
      const platform = contest.platform.trim();
      const contestName = contest.contestName.trim();
      const year = contest.startTime.getFullYear();

      const existingLinks = discussedMap.get(contestId) || [];
      const shouldFetch = contest.startTime < now && existingLinks.length < 3;

      if (shouldFetch) {
        try {
          // Extract contest number (e.g., "Starters 190" => "190")
          const numberMatch = contestName.match(/\d+/);
          const contestNumber = numberMatch ? numberMatch[0] : "";

          // Tighter query using platform and number if available
          const searchQuery = contestNumber
            ? `${platform} ${contestNumber}`
            : `${platform} ${contestName}`;

          const searchResponse = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
              key: YOUTUBE_API_KEY,
              q: searchQuery,
              part: "snippet",
              type: "video",
              maxResults: 10,
              videoEmbeddable: "true",
              safeSearch: "strict",
              order: "relevance",
            },
          });

          const videos = searchResponse.data.items.filter(
            item => item.id.kind === "youtube#video"
          );

          const keyword = contestName.toLowerCase();

          // Filter videos relevant to contest title
          let matchedVideos = videos.filter(video =>
            video.snippet.title.toLowerCase().includes(keyword)
          );

          // Fallback: if no videos match title, allow number-based match
          if (matchedVideos.length === 0 && contestNumber) {
            matchedVideos = videos.filter(video =>
              video.snippet.title.toLowerCase().includes(contestNumber)
            );
          }

          const youtubeLinks = matchedVideos
            .map(video => `https://www.youtube.com/watch?v=${video.id.videoId}`)
            .slice(0, 3);

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
          }
        } catch (err) {
          console.error(`❌ YouTube fetch error for "${contest.contestName}":`, err.response?.data || err.message);
        }
      }
    }

    const result = contestsThisMonth.map(contest => ({
      name: contest.contestName,
      platform: contest.platform,
      startTime: contest.startTime,
      youtubeLinks: (discussedMap.get(contest._id.toString()) || []).slice(0, 3),
    }));

    return res.json({
      message: "YouTube discussion links for contests in the current month",
      data: result,
    });

  } catch (err) {
    console.error("❌ Error in fetching contest discussions:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
