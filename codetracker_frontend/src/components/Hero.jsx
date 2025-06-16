import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#0F172A] via-[#0B1120] to-[#1E293B] text-white min-h-screen flex items-center">
      <div className="container mx-auto px-6 md:px-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Text Content */}
        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Welcome to <span className="text-blue-400">Coding Hive</span>
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            Track all coding contests, get daily practice problems, and engage with the coding community—all in one platform.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
            >
              Get Started
            </Link>
            <Link
              to="/upcoming"
              className="border border-blue-400 text-blue-400 hover:bg-blue-500/10 font-semibold px-6 py-3 rounded-lg"
            >
              View Contests
            </Link>
          </div>
        </div>

        {/* Right Image or Illustration */}
        <div className="mt-12 md:mt-0">
          <img
            src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.png"
            alt="Hero Illustration"
            className="w-[400px] mx-auto md:mx-0"
          />
        </div>
      </div>
    </section>
  );
}
