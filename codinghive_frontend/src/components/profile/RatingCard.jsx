import React from "react";

const RatingCard = ({ platform, currentRating, highestRating }) => {
  const maxRating = 3500;
  const currentPercent = (currentRating / maxRating) * 100;
  const highestPercent = (highestRating / maxRating) * 100;

  return (
    <div className="bg-[#111827] border border-white/10 p-6 rounded-2xl shadow-xl transition-transform transform hover:-translate-y-1 hover:shadow-blue-500/30 w-full">
      <h2 className="text-xl font-semibold text-blue-300 mb-4">
        {platform} Rating
      </h2>
      <div className="text-white text-2xl font-bold mb-1">{currentRating}</div>
      <p className="text-slate-400 text-sm mb-3">
        Highest Rating: {highestRating}
      </p>

      <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
        {/* Highest rating bar (faded gradient) */}
        <div
          className="absolute h-full rounded-full"
          style={{
            width: `${highestPercent}%`,
            background: "linear-gradient(to right, #93c5fd99, #60a5fa99)",
            zIndex: 1,
          }}
        ></div>

        {/* Current rating bar (yellow) */}
        <div
          className="absolute h-full rounded-full"
          style={{
            width: `${currentPercent}%`,
             background: "#38bdf8", 
            zIndex: 2,
          }}
        ></div>
      </div>

      <div className="flex justify-between text-xs mt-1 text-white text-opacity-60">
        <span>0</span>
        <span>{maxRating}</span>
      </div>
    </div>
  );
};

export default RatingCard;
