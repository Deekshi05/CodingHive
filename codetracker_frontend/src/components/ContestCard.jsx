import React from "react";
import { FiClock } from "react-icons/fi";

const ContestCard = ({ contest }) => {
  const getTimeRemaining = () => {
    const now = new Date();
    const start = new Date(contest.startTime);
    const diff = start - now;

    if (diff <= 0) return "Started";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="flex items-center justify-between bg-[#10172A] text-white px-6 py-4 rounded-lg shadow mb-4 hover:shadow-lg transition">
      
      {/* Logo */}
      <div className="w-12 h-12 flex-shrink-0 mr-4">
        <img
          src={contest.logo}
          alt={`${contest.platform} logo`}
          className="w-full h-full object-contain rounded"
        />
      </div>

      {/* Contest Info */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold">
          {contest.contestName}
        </h2>
        <p className="text-sm text-gray-400">
          {new Date(contest.startTime).toUTCString()}
        </p>
      </div>

      {/* Timer & Button */}
      <div className="flex flex-col items-end ml-4">
        <div className="flex items-center text-green-400 text-sm mb-1">
          <FiClock className="mr-1" />
          <span>{getTimeRemaining()}</span>
        </div>
        <a
          href={contest.contestLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md font-medium text-sm"
        >
          Register
        </a>
      </div>
    </div>
  );
};

export default ContestCard;
