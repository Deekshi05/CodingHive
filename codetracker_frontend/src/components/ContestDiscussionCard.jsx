import React from "react";

const ContestDiscussionCard = ({ contest }) => {
  const formattedDate = new Date(contest.startTime).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="max-w-md w-full mx-auto bg-[#0F172A] border border-blue-800 rounded-xl p-5 mb-4 shadow-md text-white font-mono transition hover:border-blue-400">
      {/* Contest Title */}
      <h2 className="text-lg font-semibold text-white mb-1">{contest.name}</h2>

      {/* Platform + Date */}
      <p className="text-sm text-slate-400 mb-3">
        Platform:{" "}
        <span className="font-semibold text-blue-400">{contest.platform}</span> | Date:{" "}
        <span className="text-slate-300">{formattedDate}</span>
      </p>

      {/* YouTube Links */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-2">Discussion Videos:</h3>
        {contest.youtubeLinks && contest.youtubeLinks.length > 0 ? (
          contest.youtubeLinks.map((url, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline block text-sm mb-1 transition"
            >
              🎥 YouTube Link {index + 1}
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
