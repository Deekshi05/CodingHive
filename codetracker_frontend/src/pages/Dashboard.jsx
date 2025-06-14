import React, { useEffect, useState } from "react";
import axios from "axios";
import ContestCard from "../components/ContestCard.jsx";
import ContestCalendar from "../components/ContestCalender.jsx";
import Potdcomponent from "../components/Potdcomponent.jsx";
import { MdUpcoming } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { BsLightningFill } from "react-icons/bs";

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
      <div className="flex justify-center items-center min-h-screen bg-black">
        <p className="text-white text-xl animate-pulse font-semibold uppercase tracking-wide">
          Loading Contests...
        </p>
      </div>
    );
  }

  if (upcomingContests.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <p className="text-white text-xl font-medium uppercase tracking-widest">
          No Upcoming Contests
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
  {/* Main Two Column Section: POTD Left | Calendar Right */}
  <div className="max-w-6xl mx-auto mb-20 flex flex-col lg:flex-row gap-10">
    {/* Left Side: POTD Section */}
    <div className="flex-1 space-y-6">
      {/* Heading */}
      <div className="flex items-center gap-3">
        <BsLightningFill className="text-pink-400 text-2xl" />
        <h3 className="text-2xl font-bold uppercase tracking-wide">Problems of the Day</h3>
      </div>

      {/* LeetCode POTD */}
      <div className="ml-[2.5rem]">
        <Potdcomponent />
      </div>

      {/* GFG POTD Placeholder */}
      <div className="ml-[2.5rem] space-y-2">
        <div className="flex items-center gap-2">
          <BsLightningFill className="text-green-400 text-xl" />
          <h4 className="text-lg font-semibold uppercase">GFG POTD</h4>
        </div>
        <div className="rounded-2xl px-6 py-4 bg-[#1e253b]/80 backdrop-blur-lg shadow-xl border border-[#2b324b] text-sm text-gray-400 italic">
          Coming Soon...
        </div>
      </div>
    </div>

    {/* Right Side: Calendar Section */}
    <div className="flex-1 space-y-6">
      {/* Heading */}
      <div className="flex items-center gap-3">
        <FaCalendarAlt className="text-2xl text-white" />
        <h3 className="text-2xl font-bold uppercase tracking-wide">Contest Calendar</h3>
      </div>

      {/* Calendar */}
      <div className="ml-[2.5rem]">
        <ContestCalendar contests={allContests} />
      </div>
    </div>
  </div>

  {/* Upcoming Contests Header */}
  <div className="text-center mb-16">
    <h2 className="text-5xl font-black uppercase tracking-tight flex items-center justify-center gap-4">
      <MdUpcoming className="text-white text-4xl" />
      Upcoming Contests
    </h2>
  </div>

  {/* Contest Cards */}
  <div className="max-w-4xl mx-auto flex flex-col gap-8">
    {upcomingContests.map((contest) => (
      <ContestCard key={contest._id} contest={contest} />
    ))}
  </div>
</div>
  );
}
