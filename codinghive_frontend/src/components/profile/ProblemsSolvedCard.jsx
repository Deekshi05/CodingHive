import React from "react";

const ProblemsSolvedCard = ({ stats }) => {
  return (
    <div className="bg-[#111827] border border-white/10 p-8 rounded-2xl shadow-xl transition-transform transform hover:-translate-y-1 hover:shadow-blue-500/30 w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-blue-300 mb-6">
        Problems Solved
      </h2>
      <div className="flex flex-wrap gap-x-8 gap-y-4 text-slate-400 text-base">
        {stats.map((platformStat) => (
          <div key={platformStat.platform} className="flex items-center gap-3">
            {platformStat.logo && (
              <img
                src={platformStat.logo}
                alt={`${platformStat.platform} logo`}
                className="w-6 h-6"
              />
            )}
            <span className="text-white font-medium">{platformStat.platform}:</span>
            <span>{platformStat.solved} problems</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemsSolvedCard;
