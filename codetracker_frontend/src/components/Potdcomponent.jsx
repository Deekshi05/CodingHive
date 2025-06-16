import React from "react";

export default function Potdcomponent({ title, link }) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 h-full flex flex-col justify-between">
      <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-wide">
        {title}
      </h3>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline text-base"
        >
          🔗 {title} →
        </a>
      ) : (
        <p className="text-gray-400 italic">Loading...</p>
      )}
    </div>
  );
}