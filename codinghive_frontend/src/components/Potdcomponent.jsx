import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Potdcomponent({ title, link }) {
  const isValidLink = link && link.startsWith("http");

  return (
    <div className="bg-[#111827] rounded-2xl p-6 h-full flex flex-col justify-between shadow-[0_4px_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-shadow duration-300">
      <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-wide">
        {title}
      </h3>

      {isValidLink ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-1 transition-all flex items-center gap-2"
        >
          🔗 {title} <FaExternalLinkAlt />
        </a>
      ) : link === "" ? (
        <p className="text-gray-400 italic">Loading...</p>
      ) : (
        <p className="text-red-400 italic">Invalid or missing link</p>
      )}
    </div>
  );
}
