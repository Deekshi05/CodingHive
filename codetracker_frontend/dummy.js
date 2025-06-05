import axios from 'axios';

async function getUpcomingContests() {
  try {
    const res = await axios.get('https://codeforces.com/api/contest.list');
    const contests = res.data.result;

    // Filter only upcoming contests
    const upcoming = contests.filter(contest => contest.phase === 'BEFORE');

    console.log(upcoming.slice(0, 5)); // Show next 5
  } catch (err) {
    console.error("Failed to fetch contests:", err.message);
  }
}

getUpcomingContests();