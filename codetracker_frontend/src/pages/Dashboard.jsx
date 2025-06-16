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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-white">
        <p className="text-blue-800 text-xl animate-pulse font-semibold uppercase tracking-wide">
          Loading Contests...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-white text-gray-800 px-4 py-12">
      {/* POTD and Calendar Section */}
      <div className="max-w-6xl mx-auto mb-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* POTD Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <BsLightningFill className="text-pink-500 text-2xl" />
            <h3 className="text-xl font-semibold tracking-wide uppercase">
              Problems of the Day
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            <Potdcomponent title="LeetCode POTD" link={leetcodeLink} />
            <Potdcomponent title="GFG POTD" link={gfgLink} />
          </div>
        </div>

        {/* Calendar Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaCalendarAlt className="text-2xl text-blue-800" />
            <h3 className="text-xl font-semibold tracking-wide uppercase">
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
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight flex items-center justify-center gap-4 text-blue-900">
          <MdUpcoming className="text-blue-700 text-4xl" />
          Upcoming Contests
        </h2>
      </div>

      {/* Contest Cards or Empty Message */}
      {upcomingContests.length === 0 ? (
        <p className="text-center text-xl font-medium uppercase tracking-widest text-gray-600">
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
