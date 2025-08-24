import React, { useEffect, useState } from "react";
import axiosClient from "../axiosclient.js";
import RatingCard from "../components/profile/RatingCard";
import ProblemsSolvedCard from "../components/profile/ProblemsSolvedCard";
import codeforces_logo from "../assets/codeforces_logo.png";
import codechef_logo from "../assets/codechef_logo.avif";
import { GiLaurelsTrophy } from "react-icons/gi";
import HandleEditor from "../components/profile/HandleEditor.jsx";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    return decodedPayload.userId || null;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};

const Profile = () => {
  const [codeforces, setCodeforces] = useState(null);
  const [codechef, setCodechef] = useState(null);
  const [handles, setHandles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError("User not authenticated. Please login again.");
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await axiosClient(`/userstats/${userId}`);
        setCodeforces(response.data.Codeforces);
        setCodechef(response.data.CodeChef);
        setHandles(response.data.handles || {});
      } catch (err) {
        console.error("Error fetching stats", err);
        setError("Failed to fetch user stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400 mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!codeforces || !codechef) {
    return (
      <p className="text-center text-red-500 mt-10">
        Stats not available. Please ensure coding handles are set correctly.
      </p>
    );
  }

  const problemStats = [
    {
      platform: "Codeforces",
      solved: codeforces.problemsSolved,
      logo: codeforces_logo,
    },
    {
      platform: "CodeChef",
      solved: codechef.problemsSolved,
      logo: codechef_logo,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Page Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-400">
          📊 Coding Profile Overview
        </h1>

        {/* Handle Editor */}
        <div className="bg-[#111827] p-6 rounded-xl shadow-lg">
          <HandleEditor handles={handles} setHandles={setHandles} />
        </div>

        {/* Ratings Section */}
        <div>
          <h2 className="text-2xl font-semibold text-center flex items-center justify-center gap-2 mb-6 text-white">
            <GiLaurelsTrophy className="text-yellow-400 text-3xl" />
            Ratings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RatingCard
              platform="Codeforces"
              currentRating={codeforces.currentRating}
              highestRating={codeforces.highestRating}
            />
            <RatingCard
              platform="CodeChef"
              currentRating={codechef.currentRating}
              highestRating={codechef.highestRating}
            />
          </div>
        </div>

        {/* Problems Solved Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-green-400">
            ✅ Problems Solved
          </h2>
          <div className="bg-[#111827] p-6 rounded-xl shadow-lg">
            <ProblemsSolvedCard stats={problemStats} />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
