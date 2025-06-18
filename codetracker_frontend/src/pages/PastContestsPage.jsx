import React, { useEffect, useState } from "react";
import ContestDiscussionCard from "../components/ContestDiscussionCard.jsx";
import axiosClient from "../axiosclient.js";
import { FaRegCalendarAlt } from "react-icons/fa";

const PastContestsPage = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const fetchContests = async () => {
  try {
    const response = await axiosClient.get("/past-contests");
    const data = response.data.data;

    // Ensure contests is always an array
    setContests(Array.isArray(data) ? data : [data]);
  } catch (error) {
    console.error("Failed to fetch contests:", error);
  } finally {
    setLoading(false);
  }
};

    fetchContests();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-mono px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center flex items-center justify-center gap-3">
        <FaRegCalendarAlt className="text-blue-500" />
        Past Contests & Discussions
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading contests...</p>
      ) : contests.length === 0 ? (
        <p className="text-center text-gray-400">No contests available.</p>
      ) : (
        // Use the feature card background here:
        <div className="bg-[#111827] border border-white/10 rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
          <div className="flex flex-col gap-6">
            {contests.map((contest, index) => (
              <ContestDiscussionCard key={index} contest={contest} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PastContestsPage;
