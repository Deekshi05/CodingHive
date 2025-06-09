import axios from "axios";

const query = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
    userContestRanking(username: $username) {
      rating
    }
  }
`;

export const formatData = (data, username) => {
  console.log("🔧 Formatting LeetCode user data...");
  return {
    platform: "LeetCode",
    username: username,
    rating: data.userContestRanking?.rating
      ? Math.round(data.userContestRanking.rating)
      : null,
    problemsSolved: data.matchedUser?.submitStats?.acSubmissionNum?.reduce(
      (acc, obj) => acc + (obj.count || 0),
      0
    ) || 0,
  };
};

export const fetchProfile = async (username) => {
  console.log("✅ fetchUserProfileStandalone called for:", username);

  try {
    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query,
        variables: { username },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        timeout: 15000, // increased timeout to 15 seconds
        // To force IPv4 to avoid IPv6 timeout issues:
        // You can add a custom adapter or dns.setDefaultResultOrder('ipv4first') in your app entry point.
      }
    );

    console.log("📥 Raw response received from LeetCode");

    const data = response.data;

    if (data.errors) {
      console.log("❌ LeetCode API returned an error:", data.errors);
      return { platform: "LeetCode", error: data.errors[0]?.message || "API error" };
    }

    console.log("📊 Raw GraphQL data:", data.data);

    const formatted = formatData(data.data, username);
    return formatted;
  } catch (err) {
    console.error("❌ Network or internal error occurred:", err.message, err.code);
    if (err.response) console.error("Response data:", err.response.data);
    return { platform: "LeetCode", error: err.message || "Unknown error" };
  }
};
