import React, { useEffect, useState } from "react";
import axios from "axios";
import ContestCard from "../components/ContestCard.jsx";

export default function UpcomingContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/dashboard");
        console.log("Fetched contests:", res.data);
        setContests(res.data);
      } catch (err) {
        console.error("Failed to fetch contests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-white text-lg">Loading contests...</div>;

  if (contests.length === 0)
    return <div className="text-center mt-10 text-white text-lg">No upcoming contests.</div>;

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-blue-400 mb-10">
        🚀 Upcoming Contests
      </h2>
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        {contests.map((contest) => (
          <ContestCard key={contest._id} contest={contest} />
        ))}
      </div>
    </div>
  );
}
