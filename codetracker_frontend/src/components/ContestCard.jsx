import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import leetcode_logo from "../assets/LeetCode_logo.png";
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
    LeetCode: leetcode_logo,
    Codeforces: codeforces_logo,
    Codechef: codechef_logo,
  };

  const logo = platformLogos[contest.platform] || "";

  return (
    <div className="bg-[#0F172A] border border-blue-800 rounded-xl p-5 mb-4 shadow-md flex justify-between items-center text-white font-mono transition hover:border-blue-400">
      {/* Platform Icon */}
      <div className="w-12 h-12 mr-5 flex items-center justify-center rounded-lg bg-blue-900/40">
        {logo ? (
          <img src={logo} alt={`${contest.platform} logo`} className="w-7 h-7 object-contain" />
        ) : (
          <div className="text-xs text-slate-400">No Logo</div>
        )}
      </div>

      {/* Contest Info */}
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-semibold truncate">{contest.contestName}</h2>
        <p className="text-sm text-slate-400 mt-0.5">
          {parsedStartTime.format("D MMM, h:mm A")} IST
        </p>
        <p className="text-sm text-slate-500">Duration: {contest.duration} mins</p>
      </div>

      {/* Countdown + Register */}
      <div className="flex flex-col items-end space-y-2 ml-4 min-w-[110px]">
        {timeRemaining && (
          <div className="flex items-center bg-blue-900 text-blue-300 text-sm px-3 py-1 rounded-full">
            <FiClock className="mr-2" />
            <span>{timeRemaining}</span>
          </div>
        )}
        <a
          href={contest.contestLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold px-4 py-1.5 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition text-white shadow"
        >
          Register
        </a>
      </div>
    </div>
  );
};

export default ContestCard;
