import React from "react";

const ContestDiscussionCard = ({ contest }) => {
  const formattedDate = new Date(contest.startTime).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="relative group backdrop-blur-md border border-blue-700 rounded-xl p-5 shadow-md hover:shadow-blue-500/30 transition-transform duration-300 hover:scale-[1.02] overflow-hidden">

      {/* Hover glow border effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500 group-hover:shadow-[0_0_25px_#3b82f6] transition-all duration-300 pointer-events-none"></div>

      {/* Contest Name */}
      <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
        🚀 {contest.name}
      </h2>

      {/* Platform and Date */}
      <p className="text-sm text-slate-400 mb-3">
        🖥️ Platform: <span className="font-semibold text-blue-400">{contest.platform}</span>
        &nbsp;|&nbsp; 📅 Date: <span className="text-slate-300">{formattedDate}</span>
      </p>

      {/* Discussion Links */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-2">🎥 Discussion Videos:</h3>
        {contest.youtubeLinks && contest.youtubeLinks.length > 0 ? (
          contest.youtubeLinks.map((url, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline block text-sm mb-1 transition duration-200"
            >
              🔗 YouTube Link {index + 1}
            </a>
          ))
        ) : (
          <p className="text-slate-500 italic text-sm">No discussion links available.</p>
        )}
      </div>
    </div>
  );
};

export default ContestDiscussionCard;
