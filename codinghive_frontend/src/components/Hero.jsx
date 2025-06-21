import React from "react";
import { Link } from "react-router-dom";
import heroimg from "../assets/hero.png";

export default function Hero() {
  return (
    <section className="bg-[#111827] text-white min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Text Content */}
        <div className="max-w-xl text-center md:text-left z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-white">
            Welcome to <span className="text-blue-300">Coding Hive</span>
          </h1>
          <p className="text-base md:text-lg text-gray-400 mb-8">
            Track all coding contests, get daily practice problems, and engage with the coding community—all in one platform.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link
              to="/signup"
              className="bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-semibold transition-all"
            >
              Get Started
            </Link>
            <Link
              to="/upcoming"
              className="border border-blue-400 text-blue-300 hover:bg-blue-500/10 px-6 py-3 rounded-lg text-sm font-semibold transition-all"
            >
              View Contests
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0">
          <img
            src={heroimg}
            alt="Hero Illustration"
            className="w-full h-auto object-cover max-h-[90vh] mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
