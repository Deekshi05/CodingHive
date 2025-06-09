import  { useEffect, useState } from "react";
import axiosClient from "../axiosclient.js"; // your configured Axios
// import "./ProfilePage.css"; // optional styling

export default function ProfilePage() {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosClient.get("/profile");
        setPlatforms(response.data.platforms);
      } catch (err) {
        setError("❌ Failed to fetch profile stats");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-container">
      <h1>👤 Your Coding Stats</h1>
      <div className="profile-grid">
        {platforms.map((p) => (
          <div key={p.platform} className="platform-card">
            <h2>{p.platform}</h2>
            {p.error ? (
              <p className="error">❌ {p.error}</p>
            ) : (
              <>
                <p><strong>Username:</strong> {p.username}</p>
                <p><strong>Rating:</strong> {p.rating ?? "N/A"}</p>
                <p><strong>Problems Solved:</strong> {p.problemsSolved ?? "N/A"}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
