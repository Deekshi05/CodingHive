import React from "react";
import { FiCalendar } from "react-icons/fi";

const ContestCalendar = ({ contests }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const currentDay = today.getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const contestDatesSet = new Set(
    contests
      .filter(
        (contest) =>
          new Date(contest.startTime).getMonth() === month &&
          new Date(contest.startTime).getFullYear() === year
      )
      .map((contest) => new Date(contest.startTime).getDate())
  );

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarCells.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarCells.push(day);

  return (
    <div className="w-full flex justify-center mt-10 px-4 font-mono">
      <div className="bg-[#0e1b30] border border-white/10 backdrop-blur-sm text-white p-6 rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold tracking-widest text-blue-400 uppercase">
            Contest Calendar
          </h2>
          <FiCalendar size={20} className="text-blue-400" />
        </div>

        <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-400 mb-3 uppercase tracking-wide">
          {weekdays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 justify-items-center">
          {calendarCells.map((day, index) => {
            if (!day) return <div key={index} />;

            const isContestDay = contestDatesSet.has(day);
            const isToday = day === currentDay;

            return (
              <div
                key={index}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-200
                  ${
                    isContestDay
                      ? "bg-white text-[#0e1b30] shadow-md shadow-white/30"
                      : isToday
                      ? "border border-blue-400 text-blue-300 bg-white/10"
                      : "text-gray-400 hover:bg-white/5"
                  }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContestCalendar;
