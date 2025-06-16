import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Features from "../components/Features";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1120] via-[#0F172A] to-[#1E293B] text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <Hero />
      </section>

      {/* Features Section */}
      <section>
        <Features />
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[#0F172A]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Login / Signup",
              "Browse Contests",
              "Solve Daily Problems",
              "Join Discussions"
            ].map((step, idx) => (
              <div key={idx} className="bg-white/10 p-6 rounded-lg">
                <div className="text-3xl font-bold mb-2">{idx + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Community in Numbers</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {[
              { num: "500+", label: "Active Users" },
              { num: "2000+", label: "Problems Solved" },
              { num: "100+", label: "Contests Tracked" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-extrabold text-blue-400">
                  {stat.num}
                </div>
                <p className="text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0B1120] text-center">
        <div className="container mx-auto px-6">
          <p className="text-slate-500">
            © {new Date().getFullYear()} Coding Hive
          </p>
          <div className="mt-4 space-x-4">
            <Link to="/about" className="text-slate-400 hover:text-white">
              About
            </Link>
            <Link to="/contact" className="text-slate-400 hover:text-white">
              Contact
            </Link>
            <Link to="/privacy" className="text-slate-400 hover:text-white">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
