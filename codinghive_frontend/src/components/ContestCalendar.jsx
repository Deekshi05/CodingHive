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

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarCells.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarCells.push(day);

  return (
    <div className="w-full flex justify-center mt-10 px-4 font-mono">
      <div className="bg-[#111827] border border-white/10 backdrop-blur-md text-white p-6 rounded-2xl w-full max-w-sm shadow-[0_0_20px_rgba(0,200,255,0.1)]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold tracking-widest text-white uppercase">
            Contest Calendar
          </h2>
          <FiCalendar size={22} className="text-white" />
        </div>

        <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
          {weekdays.map((day) => (
            <div key={day}>{day[0]}</div>
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
                      ? "bg-blue-500 text-white shadow-lg"
                      : isToday
                      ? "border border-white text-white bg-white/10"
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
