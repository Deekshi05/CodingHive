import React, { useEffect, useState } from "react";
import axios from "axios";
import ContestCard from "../components/ContestCard.jsx";
import ContestCalendar from "../components/ContestCalender.jsx";

export default function UpcomingContests() {
  const [allContests, setAllContests] = useState([]);
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/dashboard");
        setAllContests(res.data.allContests);
        setUpcomingContests(res.data.upcomingContests);
      } catch (err) {
        console.error("Failed to fetch contests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
        <p className="text-blue-300 text-lg animate-pulse font-medium">
          Loading contests...
        </p>
      </div>
    );
  }

  if (upcomingContests.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
        <p className="text-gray-300 text-lg">No upcoming contests.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] py-12 px-4 text-white">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-400 mb-14">
        🚀 Upcoming Contests
      </h2>

      {/* Pass all contests to the calendar */}
      <div className="max-w-4xl mx-auto mb-12 px-4 sm:px-6">
        <ContestCalendar contests={allContests} />
      </div>

      <div className="flex flex-col gap-6 max-w-3xl mx-auto px-4 sm:px-6">
        {upcomingContests.map((contest) => (
          <ContestCard key={contest._id} contest={contest} />
        ))}
      </div>
    </div>
  );
}
