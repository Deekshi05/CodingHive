import React from "react";

const ContestDiscussionCard = ({ contest }) => {
  const formattedDate = new Date(contest.startTime).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="relative group bg-[#0F172A]/40 backdrop-blur-md border border-blue-800 rounded-2xl p-6 shadow-md hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] overflow-hidden">

      {/* Gradient border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500 group-hover:shadow-[0_0_30px_#3b82f6] transition-all duration-300 pointer-events-none"></div>

      {/* Contest Title */}
      <h2 className="text-xl font-bold mb-2 text-slate-100 group-hover:text-blue-400 transition-colors duration-300">
        🚀 {contest.name}
      </h2>

      {/* Platform + Date */}
      <p className="text-sm text-slate-400 mb-4">
        🖥️ Platform:{" "}
        <span className="font-semibold text-blue-400">{contest.platform}</span> &nbsp;|&nbsp; 📅 Date:{" "}
        <span className="text-slate-300">{formattedDate}</span>
      </p>

      {/* YouTube Links */}
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
