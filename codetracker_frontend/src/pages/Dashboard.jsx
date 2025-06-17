import React, { useEffect, useState } from "react";
import ContestCard from "../components/ContestCard.jsx";
import ContestCalendar from "../components/ContestCalendar.jsx";
import Potdcomponent from "../components/Potdcomponent.jsx";
import { MdUpcoming } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { BsLightningFill } from "react-icons/bs";
import axiosClient from "../axiosclient.js";

export default function UpcomingContests() {
  const [allContests, setAllContests] = useState([]);
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leetcodeLink, setLeetcodeLink] = useState("");
  const [gfgLink, setGfgLink] = useState("");

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axiosClient.get("/dashboard/upcoming-contests");
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

  useEffect(() => {
    const fetchPOTD = async () => {
      try {
        const response = await axiosClient.get("/dashboard/potd");
        const data = response.data;
        setLeetcodeLink(data.leetcode || "");
        setGfgLink(data.gfg || "");
      } catch (error) {
        console.error("Error fetching POTD:", error.message);
      }
    };
    fetchPOTD();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <p className="text-blue-400 text-xl animate-pulse font-semibold tracking-wide uppercase">
          Loading Contests...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 py-12">
      {/* POTD and Calendar Section */}
      <div className="max-w-6xl mx-auto mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* POTD */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <BsLightningFill className="text-pink-500 text-2xl" />
            <h3 className="text-xl font-semibold tracking-wide text-blue-300">
              Problem of the Day
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            <Potdcomponent title="LeetCode POTD" link={leetcodeLink} />
            <Potdcomponent title="GFG POTD" link={gfgLink} />
          </div>
        </div>

        {/* Calendar */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaCalendarAlt className="text-2xl text-blue-500" />
            <h3 className="text-xl font-semibold tracking-wide text-blue-300">
              Contest Calendar
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ContestCalendar contests={allContests} />
          </div>
        </div>
      </div>

      {/* Upcoming Contests Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-blue-400 flex items-center justify-center gap-4">
          <MdUpcoming className="text-blue-600 text-4xl" />
          Upcoming Contests
        </h2>
      </div>

      {/* Contest Cards */}
      {upcomingContests.length === 0 ? (
        <p className="text-center text-lg text-slate-400 uppercase tracking-widest">
          No Upcoming Contests
        </p>
      ) : (
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {upcomingContests.map((contest) => (
            <div key={contest._id}>
              <ContestCard contest={contest} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
