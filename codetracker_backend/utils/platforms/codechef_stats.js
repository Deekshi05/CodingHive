import axios from "axios";
import * as cheerio from "cheerio";

export const getCodechefStats = async (username, userId) => {
  try {
    const url = `https://www.codechef.com/users/${username}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const rating = parseInt($(".rating-number").first().text().trim()) || null;

    const highestRating = parseInt(
      $(".rating-header .max-rating span").last().text().trim()
    ) || null;

    let problemsSolved = 0;
    $("section.problems-solved h5").each((_, el) => {
      const match = $(el).text().match(/\d+/);
      if (match) problemsSolved += parseInt(match[0]);
    });

    const newStats = {
      userId,
      platform: "CodeChef",
      currentRating: rating,
      highestRating: highestRating,
      problemsSolved,
      accuracy: 0.0,
      streak: 0,
      lastFetched: new Date(),
    };
     return newStats;
  } catch (error) {
    console.error("❌ Error fetching CodeChef data:", error.message);
  }
};

