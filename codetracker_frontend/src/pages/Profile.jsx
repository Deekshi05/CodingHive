import React, { useEffect, useState } from "react";
import { FaChartLine, FaCheckCircle } from "react-icons/fa";
import axiosClient from "../axiosclient.js";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const payloadBase64 = token.split('.')[1];
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
        const [cfRes, ccRes] = await Promise.all([
          axiosClient.get(`/stats/codeforces/${userId}`),
          axiosClient.get(`/stats/codechef/${userId}`)
        ]);
        setCodeforces(cfRes.data);
        setCodechef(ccRes.data);
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
    return <p className="text-center text-red-500 mt-10">Stats not available</p>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">📊 Coding Profile Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ratings Card */}
          <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700">
            <div className="flex items-center gap-2 text-blue-400 mb-4 text-xl font-semibold">
              <FaChartLine />
              Ratings
            </div>
            <div className="space-y-5">
              {/* Codeforces */}
              <div>
                <p className="mb-1">Codeforces: <span className="text-blue-300 font-medium">{codeforces.currentRating}</span></p>
                <div className="h-2 w-full bg-gray-700 rounded">
                  <div className="h-2 rounded bg-gradient-to-r from-blue-400 to-blue-600" style={{ width: `${(codeforces.currentRating / 3000) * 100}%` }}></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">Max: {codeforces.highestRating}</p>
              </div>

              {/* CodeChef */}
              <div>
                <p className="mb-1">CodeChef: <span className="text-blue-300 font-medium">{codechef.currentRating}</span></p>
                <div className="h-2 w-full bg-gray-700 rounded">
                  <div className="h-2 rounded bg-gradient-to-r from-blue-400 to-blue-600" style={{ width: `${(codechef.currentRating / 3000) * 100}%` }}></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">Max: {codechef.highestRating}</p>
              </div>
            </div>
          </div>

          {/* Performance Card */}
          <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700">
            <div className="flex items-center gap-2 text-purple-400 mb-4 text-xl font-semibold">
              <FaCheckCircle />
              Performance
            </div>
            <div className="space-y-4">
              <p>
                <span className="font-medium text-gray-300">Total Solved:</span>{" "}
                {codeforces.problemsSolved + codechef.problemsSolved}
              </p>
              <p>
                <span className="font-medium text-gray-300">Accuracy:</span>{" "}
                {((codeforces.accuracy + codechef.accuracy) / 2).toFixed(2)}%
              </p>
              <p>
                <span className="font-medium text-gray-300">Streak:</span>{" "}
                <span className="text-green-400">CF: {codeforces.streak}</span>,{" "}
                <span className="text-yellow-400">CC: {codechef.streak}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
