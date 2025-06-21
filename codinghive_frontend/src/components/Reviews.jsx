// src/components/Reviews.jsx
import React from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Aarav S.",
    review: "Coding Hive keeps me updated with all contests. It's my go-to site before every weekend contest!",
    rating: 5
  },
  {
    name: "Meera D.",
    review: "The UI is clean and easy to use. I love the daily problems—it keeps my streak alive!",
    rating: 4
  },
  {
    name: "Kiran R.",
    review: "The discussion section and post-contest videos are very helpful. Great platform!",
    rating: 5
  }
];

export default function Reviews() {
  return (
    <section className="py-16 bg-[#0f172a] text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-12">What Users Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="bg-[#111827] border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition duration-300"
            >
              <div className="flex justify-center mb-4 text-yellow-400">
                {Array.from({ length: item.rating }, (_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-slate-300 italic mb-4">"{item.review}"</p>
              <h4 className="font-semibold text-blue-300">{item.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
