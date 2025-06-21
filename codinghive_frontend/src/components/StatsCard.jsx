const StatsCard = ({ title, children }) => (
  <div className="bg-[#111827] border border-white/10 p-6 rounded-2xl shadow-xl transition-transform transform hover:-translate-y-1 hover:shadow-blue-500/30 w-full">
    <h2 className="text-xl font-semibold text-blue-300 mb-4">{title}</h2>
    <div className="text-slate-400 text-sm">{children}</div>
  </div>
);

export default StatsCard;
