import axios from "axios";

async function getLeetCodeContests() {
  try {
    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query: `
          query {
            allContests {
              title
              titleSlug
              startTime
              duration
              originStartTime
            }
          }
        `
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    const contests = response.data.data.allContests;

    const upcoming = contests.filter(c => c.startTime * 1000 > Date.now());

    const formatted = upcoming.map(contest => ({
      title: contest.title,
      url: `https://leetcode.com/contest/${contest.titleSlug}`,
      startTime: new Date(contest.startTime * 1000).toLocaleString(),
      durationMinutes: contest.duration / 60,
    }));

    console.log("Upcoming LeetCode Contests:");
    console.log(formatted);
  } catch (err) {
    console.error("Failed to fetch LeetCode contests:", err.message);
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    }
  }
}

getLeetCodeContests();
