import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import leetcode_logo from "../assets/LeetCode_logo.png";
import codeforces_logo from "../assets/codeforces_logo.png";
import codechef_logo from "../assets/codechef_logo.avif";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";

// Extend plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

const ContestCard = ({ contest }) => {
 let parsedStartTime = dayjs.utc(contest.startTime).tz("Asia/Kolkata")
parsedStartTime = parsedStartTime.add(5, 'hour').add(30, 'minute');       // Add +5:30 again
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = dayjs().tz("Asia/Kolkata");
      const diffMillis = parsedStartTime.diff(now);

      if (diffMillis <= 0) {
        setTimeRemaining("Started");
        return;
      }

      const durationObj = dayjs.duration(diffMillis);
      const hours = Math.floor(durationObj.asHours());
      const minutes = durationObj.minutes();
      const seconds = durationObj.seconds();

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateRemainingTime();
    const intervalId = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(intervalId);
  }, [parsedStartTime]);

  const platformLogos = {
    LeetCode: leetcode_logo,
    Codeforces: codeforces_logo,
    Codechef: codechef_logo,
  };

  const logo = platformLogos[contest.platform] || "";

  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] text-white px-6 py-5 rounded-xl shadow-md hover:shadow-2xl hover:ring-2 hover:ring-green-400 transition-all duration-300 mb-5">
      <div className="w-10 h-10 flex-shrink-0 mr-6 bg-gray-800 rounded-lg flex items-center justify-center">
        {logo ? (
          <img src={logo} alt={`${contest.platform} logo`} className="w-8 h-8 object-contain" />
        ) : (
          <div className="text-xs text-gray-400">No Logo</div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-semibold truncate">{contest.contestName}</h2>
        <p className="text-sm text-gray-400 mt-1">
          {parsedStartTime.format("D MMM YYYY, h:mm A [IST]")}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Duration: {contest.duration} mins
        </p>
      </div>

      <div className="flex flex-col items-end ml-6 space-y-2 min-w-[110px]">
        {timeRemaining && (
          <div className="flex items-center bg-green-700 bg-opacity-30 text-green-300 text-sm px-3 py-1 rounded-full font-medium">
            <FiClock className="mr-2" />
            <span>{timeRemaining}</span>
          </div>
        )}
        <a
          href={contest.contestLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition rounded-md px-5 py-2 font-semibold text-sm whitespace-nowrap text-white"
        >
          Register
        </a>
      </div>
    </div>
  );
};

export default ContestCard;
