import axios from "axios";
import * as cheerio from "cheerio";

export const getCodechefStats = async (username, userId) => {
  try {
    const url = `https://www.codechef.com/users/${username}`;
    
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);

    // Extract current rating
    const currentRatingText = $(".rating-number").first().text().trim();
    const currentRating = parseInt(currentRatingText) || null;

    // Extract highest rating
    const highestRatingText = $(".rating-header .max-rating span").last().text().trim();
    const highestRating = parseInt(highestRatingText) || null;

    // Extract problems solved
    let problemsSolved = 0;
    $("section.problems-solved h5").each((_, el) => {
      const match = $(el).text().match(/\d+/);
      if (match) problemsSolved += parseInt(match[0]);
    });

    const newStats = {
      userId,
      platform: "CodeChef",
      currentRating,
      highestRating,
      problemsSolved,
      accuracy: 0.0, // CodeChef does not expose accuracy
      streak: 0,     // CodeChef does not expose streaks
      lastFetched: new Date(),
    };

    console.log("✅ CodeChef stats scraped:", newStats);
    return newStats;
  } catch (error) {
    console.error("❌ Error fetching CodeChef data:", error.message);
    return {
      userId,
      platform: "CodeChef",
      currentRating: null,
      highestRating: null,
      problemsSolved: 0,
      accuracy: 0.0,
      streak: 0,
      lastFetched: new Date(),
    };
  }
};
