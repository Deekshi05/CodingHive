// components/ContestDiscussionCard.jsx
import React from "react";

const ContestDiscussionCard = ({ contest }) => {
  const formattedDate = new Date(contest.startTime).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{contest.name}</h2>
      <p className="text-sm text-gray-500 mb-3">
        Platform: <span className="font-medium">{contest.platform}</span> | Date: {formattedDate}
      </p>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Discussion Videos:</h3>
        {contest.youtubeLinks && contest.youtubeLinks.length > 0 ? (
          contest.youtubeLinks.map((url, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline block text-sm mb-1"
            >
              🎥 YouTube Link {index + 1}
            </a>
          ))
        ) : (
          <p className="text-gray-400 text-sm italic">No discussion links available.</p>
        )}
      </div>
    </div>
  );
};

export default ContestDiscussionCard;
