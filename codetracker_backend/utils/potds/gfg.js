import axios from "axios";
export const getGfgPotd = async () => {
  try {
    // const response = await axios.get('https://leetcode-api-pied.vercel.app/daily');
    // const data = response.data;
    const fullUrl =  "https://practice.geeksforgeeks.org/problem-of-the-day";
    console.log(fullUrl);
    return fullUrl
  }catch(err){
    console.log(err);
  }
}