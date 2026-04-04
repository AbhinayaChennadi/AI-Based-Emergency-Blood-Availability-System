import "../styles/Features.css";

function Features() {
  return (
    <div className="features-container">

      <div className="feature-card">
        <h3>Real-Time Matching</h3>
        <p>Connect with donors in real time based on blood type and location.</p>
      </div>

      <div className="feature-card">
        <h3>Timely Alerts</h3>
        <p>Email, WhatsApp & in-app notifications for new requests.</p>
      </div>

      <div className="feature-card">
        <h3>Unified Dashboard</h3>
        <p>Manage your donations, requests and profile in one place.</p>
      </div>

      <div className="feature-card">
        <h3>AI Predictions</h3>
        <p>Analyze trends and predict future blood demand.</p>
      </div>

    </div>
  );
}

export default Features;