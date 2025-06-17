import React from "react";

const features = [
  {
    title: "Contest Calendar",
    description:
      "Our Contest Calendar feature keeps you updated on upcoming coding competitions across various platforms. Whether you're looking for a quick challenge or a major contest, we ensure you never miss an opportunity to showcase your skills.",
    image: "/images/calendar.png",
  },
  {
    title: "User Stats",
    description:
      "With our User Stats feature, track your coding performance over time. Gain insights into your strengths and areas for improvement, helping you to refine your skills and achieve your goals.",
    image: "/images/stats.png",
  },
  {
    title: "Post-Contest Discussions",
    description:
      "Engage with our Post-Contest Discussions, where you can share insights and strategies with fellow coders. This collaborative space allows for shared learning and growth, enhancing your coding experience.",
    image: "/images/discussion.png",
  },
];

export default function Features() {
  return (
    <section className="bg-[#0f172a] text-white py-16 px-6 md:px-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">
          Features of our coding platform
        </h2>
        <p className="text-slate-400 max-w-3xl mx-auto">
          From tracking contests to analyzing performance metrics, we work diligently to provide features that enhance your coding journey.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#111827] border border-white/10 rounded-2xl shadow-xl transition-transform transform hover:-translate-y-1 hover:shadow-blue-500/30 w-full"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-56 object-cover rounded-t-2xl"
            />
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-semibold text-blue-300">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
