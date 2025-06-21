
import axios from "axios";
export const getLeetcodePotd = async () => {
  try {
    const response = await axios.get('https://leetcode-api-pied.vercel.app/daily');
    const data = response.data;
    const fullUrl = `https://leetcode.com${data.link}`
    console.log(fullUrl);
    return fullUrl
  }catch(err){
    console.log(err);
  }
}