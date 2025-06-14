
const StatsCard = ({ title, children }) => (
  <div className="card">
    <h2>{title}</h2>
    <div>{children}</div>
  </div>
);

export default StatsCard;
