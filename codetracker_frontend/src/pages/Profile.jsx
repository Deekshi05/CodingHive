import React, { useEffect, useState } from "react";
import axiosClient from "../axiosclient.js";
import RatingCard from "../components/profile/RatingCard";
import ProblemsSolvedCard from "../components/profile/ProblemsSolvedCard";
import codeforces_logo from "../assets/codeforces_logo.png";
import codechef_logo from "../assets/codechef_logo.avif";
import { GiLaurelsTrophy } from "react-icons/gi";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (!userId) {
      console.error("User ID not found in token");
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await axiosClient(`/userstats/${userId}`);
        setCodeforces(response.data.Codeforces);
        setCodechef(response.data.CodeChef);
      } catch (err) {
        console.error("Error fetching stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return <p className="text-center text-gray-400 mt-10">Loading...</p>;

  if (!codeforces || !codechef)
    return (
      <p className="text-center text-red-500 mt-10">Stats not available</p>
    );

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
    <div className="min-h-screen bg-[#0f172a] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">
          📊 Coding Profile Overview
        </h1>
        <h2 className="text-2xl font-semibold mb-4 text-center flex items-center justify-center gap-2 text-white">
          <GiLaurelsTrophy className="text-yellow-400 text-2xl" />
          Ratings
        </h2>
        {/* Rating Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
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

        {/* Problems Solved */}
        <h2 className="text-2xl font-semibold mb-4 text-center">
          ✅ Problems Solved
        </h2>
        <ProblemsSolvedCard stats={problemStats} />
      </div>
    </div>
  );
};

export default Profile;
