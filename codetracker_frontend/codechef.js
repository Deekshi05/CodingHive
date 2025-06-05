import axios from "axios";

const username = "Deekshu@04";
const apiKey = "5f077a631060729e5789b49b4bed4df99ba8281f";

const authHeader = `ApiKey ${username}:${apiKey}`;

async function fetchContests() {
  try {
    const response = await axios.get("https://clist.by/api/v2/contest/", {
      headers: {
        Authorization: authHeader,
      },
      params: {
        resource_id: 2, // CodeChef resource ID, for example
        limit: 3,
        order_by: "start",
        start__gt: new Date().toISOString(), // Only upcoming contests
      },
    });

    console.log("Contests:", response.data.objects);
  } catch (error) {
    console.error("Error fetching contests:", error.response?.status, error.response?.data);
  }
}

fetchContests();
