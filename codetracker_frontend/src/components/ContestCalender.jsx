import React from "react";
import { FiCalendar } from "react-icons/fi";

const ContestCalendar = ({ contests }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

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
    <div className="bg-[#10172A] rounded-xl shadow-md p-6 sm:p-8 text-white">
      <div className="flex items-center mb-6 space-x-3">
        <FiCalendar size={26} className="text-green-400" />
        <h2 className="text-xl font-semibold">
          Contests Calendar - {year} / {month + 1}
        </h2>
      </div>

      <div className="grid grid-cols-7 text-center text-sm font-semibold mb-4 text-gray-400 select-none">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarCells.map((day, i) => {
          if (!day) return <div key={i} />;
          const isContestDay = contestDatesSet.has(day);

          return (
            <div
              key={i}
              className={`py-2 rounded-full text-sm transition duration-200 ${
                isContestDay
                  ? "bg-green-600 text-white font-bold shadow-md"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContestCalendar;
