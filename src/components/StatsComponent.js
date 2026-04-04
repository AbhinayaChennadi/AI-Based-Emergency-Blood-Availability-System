import "../styles/Stats.css";

function Stats() {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <h2>12,450+</h2>
        <p>Registered Donors</p>
      </div>

      <div className="stat-card">
        <h2>8,200+</h2>
        <p>Lives Saved</p>
      </div>

      <div className="stat-card">
        <h2>38</h2>
        <p>Active Requests</p>
      </div>

      <div className="stat-card">
        <h2>120+</h2>
        <p>Cities Covered</p>
      </div>
    </div>
  );
}

export default Stats;