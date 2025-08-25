import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import leetCode_logo from "../assets/LeetCode_logo.png";
import codeforces_logo from "../assets/codeforces_logo.png";
import codechef_logo from "../assets/codechef_logo.avif";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

const ContestCard = ({ contest }) => {
  let parsedStartTime = dayjs.utc(contest.startTime).tz("Asia/Kolkata");
  parsedStartTime = parsedStartTime.add(5, "hour").add(30, "minute");

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
    Leetcode: leetCode_logo,
    Codeforces: codeforces_logo,
    Codechef: codechef_logo,
  };

  const logo = platformLogos[contest.platform] || "";
  // console.log(contest.platform);

  return (
    <div className="bg-[#111827] border border-white/10 p-6 rounded-2xl shadow-xl transition-transform transform hover:-translate-y-1 hover:shadow-blue-500/30 w-full max-w-3xl mx-auto mb-6">
      <div className="flex items-center justify-between space-x-4">
        {/* Logo Section */}
        <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-blue-950/50 shadow-inner">
          {logo ? (
            <img
              src={logo}
              alt={`${contest.platform} logo`}
              className="w-8 h-8 object-contain"
            />
          ) : (
            <span className="text-sm text-gray-400">No Logo</span>
          )}
        </div>

        {/* Info Section */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white tracking-tight truncate">
            {contest.contestName}
          </h2>
          <p className="text-sm text-gray-400">
            🕓 {parsedStartTime.format("D MMM, h:mm A")} IST
          </p>
          <p className="text-sm text-gray-500">
            ⏳ Duration: {contest.duration} mins
          </p>
        </div>

        {/* Action Section */}
        <div className="flex flex-col items-end space-y-3 min-w-[120px]">
          {timeRemaining && (
            <div className="flex items-center text-sm text-blue-300 bg-blue-900/40 px-3 py-1.5 rounded-full shadow-sm animate-pulse">
              <FiClock className="mr-1" />
              <span>{timeRemaining}</span>
            </div>
          )}

          <a
            href={contest.contestLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold transition-all"
          >
            Register →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
