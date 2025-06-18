import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Reviews from "../components/Reviews"; // ✅ Import Reviews component

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section>
        <Features />
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Login / Signup",
              "Browse Contests",
              "Solve Daily Problems",
              "Go through post-contest solutions on YouTube"
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-[#111827] border border-white/10 p-6 rounded-2xl shadow-xl transition-transform transform hover:-translate-y-1 hover:shadow-blue-500/30"
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {idx + 1}
                </div>
                <p className="text-slate-400">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-12">
            Community in Numbers
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { num: "500+", label: "Active Users" },
              { num: "2000+", label: "Problems Solved" },
              { num: "100+", label: "Contests Tracked" }
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-white/10 p-6 rounded-2xl shadow-xl transition-transform transform hover:-translate-y-1 hover:shadow-blue-500/30 w-64"
              >
                <div className="text-4xl font-extrabold text-blue-400 mb-2">
                  {stat.num}
                </div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews /> {/* ✅ Added here */}

      {/* Footer */}
      <footer className="py-10 bg-[#111827] border-t border-white/10 text-center">
        <div className="container mx-auto px-6">
          <p className="text-slate-400 mb-4">
            © {new Date().getFullYear()} Coding Hive
          </p>
          <div className="space-x-6">
            <Link to="/about" className="text-blue-400 hover:text-white transition">
              About
            </Link>
            <Link to="/contact" className="text-blue-400 hover:text-white transition">
              Contact
            </Link>
            <Link to="/privacy" className="text-blue-400 hover:text-white transition">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
