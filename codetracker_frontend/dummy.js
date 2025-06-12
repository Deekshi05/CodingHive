import axios from "axios";

async function fetchGfgPotd() {
  try {
    const response = await axios.get('https://practiceapi.geeksforgeeks.org/api/v1/problem-of-the-day/problem/today/');
    const problem = response.data.problem;
    console.log(problem.problem_link);
    return {
      title: problem.problem_title,
      difficulty: problem.difficulty,
      url: problem.problem_link
    };
  } catch (error) {
    console.error('Error fetching GFG POTD:', error.message);
    return null;
  }
}
fetchGfgPotd();