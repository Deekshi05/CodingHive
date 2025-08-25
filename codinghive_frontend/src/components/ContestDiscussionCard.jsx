import React from "react";
import codeforces_logo from "../assets/codeforces_logo.png";
import codechef_logo from "../assets/codechef_logo.avif";
import leetCode_logo from "../assets/LeetCode_logo.png";

const ContestDiscussionCard = ({ contest }) => {
 const formattedDate = new Date(new Date(contest.startTime).getTime() + 5.5 * 60 * 60 * 1000).toLocaleString(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

  const getLogo = (platform) => {
    switch (platform.toLowerCase()) {
      case "codeforces":
        return codeforces_logo;
      case "codechef":
        return codechef_logo;
      case "leetcode":
        return leetCode_logo;
      default:
        return null;
    }
  };

  const logo = getLogo(contest.platform);

  return (
    <div className="relative group flex justify-between items-center gap-4 backdrop-blur-md rounded-xl p-5 shadow-md transition-all duration-300 hover:scale-[1.02] overflow-hidden border border-transparent hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
      
      {/* LEFT: Contest Details */}
      <div className="flex-1">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          🚀 {contest.name}
        </h2>

        <p className="text-sm text-slate-400 mb-3">
          🖥️ Platform: <span className="font-semibold text-blue-400">{contest.platform}</span>
          &nbsp;|&nbsp; 📅 Date: <span className="text-slate-300">{formattedDate}</span>
        </p>

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

      {/* RIGHT: Platform Logo */}
      {logo && (
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={logo}
            alt={`${contest.platform} logo`}
            className="w-full h-full object-contain rounded-xl shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default ContestDiscussionCard;
