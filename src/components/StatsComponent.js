import { useState, useEffect } from "react";
import "../styles/Stats.css";

function StatsComponent() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    bloodGroupStats: {},
  });
  const [warnings, setWarnings] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [donorRes, requestRes] = await Promise.all([
          fetch("/api/donors"),
          fetch("/api/requests"),
        ]);

        const donors = donorRes.ok ? await donorRes.json() : [];
        const requests = requestRes.ok ? await requestRes.json() : [];

        // Calculate stats
        const bloodGroupStats = {};
        donors.forEach((donor) => {
          if (donor.bloodGroup) {
            bloodGroupStats[donor.bloodGroup] = (bloodGroupStats[donor.bloodGroup] || 0) + 1;
          }
        });

        setStats({
          totalDonors: donors.length,
          totalRequests: requests.length,
          bloodGroupStats,
        });

        // Check for shortages (less than 5 donors per blood group)
        const newWarnings = [];
        const criticalGroups = ["O-", "AB-", "B-"];
        Object.keys(bloodGroupStats).forEach((group) => {
          if (bloodGroupStats[group] < 5) {
            newWarnings.push(`${group}: Low donor count (${bloodGroupStats[group]})`);
          }
        });

        // Always warn for critical groups if low
        criticalGroups.forEach((group) => {
          if (!bloodGroupStats[group] || bloodGroupStats[group] < 3) {
            if (!newWarnings.some(w => w.startsWith(group))) {
              newWarnings.push(`${group}: Critical shortage (${bloodGroupStats[group] || 0})`);
            }
          }
        });

        setWarnings(newWarnings);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h2>{stats.totalDonors}+</h2>
        <p>Registered Donors</p>
      </div>

      <div className="stat-card">
        <h2>{stats.totalRequests}</h2>
        <p>Active Requests</p>
      </div>

      <div className="stat-card">
        <h2>{Object.keys(stats.bloodGroupStats).length}</h2>
        <p>Blood Groups</p>
      </div>

      <div className="stat-card">
        <h2>24/7</h2>
        <p>Emergency Support</p>
      </div>

      {warnings.length > 0 && (
        <div className="warning-section">
          <h3>⚠️ Blood Shortage Alerts</h3>
          <ul>
            {warnings.map((warning, index) => (
              <li key={index} className="warning-item">{warning}</li>
            ))}
          </ul>
          <p className="warning-note">Please consider donating to help save lives!</p>
        </div>
      )}
    </div>
  );
}

export default StatsComponent;