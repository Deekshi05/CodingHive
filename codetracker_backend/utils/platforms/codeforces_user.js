import axios from "axios";
export const fetchProfile=async(username)=>{
  try {
    
    const userInfoRes = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
    if (userInfoRes.data.status !== "OK") throw new Error("API error fetching user info");
    const user = userInfoRes.data.result[0];
    
    const submissionsRes = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
    if (submissionsRes.data.status !== "OK") throw new Error("API error fetching submissions");
   
    const submissions = submissionsRes.data.result;

    const solvedProblemsSet = new Set();

    submissions.forEach((submission) => {
      if (submission.verdict === "OK") {
       
        const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
        solvedProblemsSet.add(problemKey);
      }
    });

    const problemsSolved = solvedProblemsSet.size;

    const data= {
      platform: "Codeforces",
      username: username,
      rating: user.rating ? parseInt(user.rating) : null,
      problemsSolved,
    };
    return data;
  } catch (error) {
  console.error("❌ Codeforces fetch error:", error);
  return {
    platform: "Codeforces",
    error: error?.message || "Unknown error",
  };
}
}