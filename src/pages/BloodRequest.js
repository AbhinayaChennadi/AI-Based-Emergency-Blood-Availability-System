import React, { useState } from "react";
import "../styles/Request.css"; // Your updated CSS

// Mock donors (same as before)
const mockDonors = [
  { id: 1, name: 'Rahul K', blood: 'O+', contact: '9876543210', location: 'Hyderabad', availability: 'Available', distance: '2km' },
  { id: 2, name: 'Priya S', blood: 'A+', contact: '9123456789', location: 'Secunderabad', availability: 'Available', distance: '5km' },
  { id: 3, name: 'Amit R', blood: 'B-', contact: '9988776655', location: 'Banjara Hills', availability: 'Busy', distance: '1km' },
];

function BloodRequest() {
  const [blood, setBlood] = useState("");
  const [location, setLocation] = useState("Hyderabad");
  const [matched, setMatched] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const result = mockDonors.filter(
      (d) =>
        d.blood.toLowerCase() === blood.toLowerCase() &&
        d.availability === "Available" &&
        d.location.toLowerCase().includes(location.toLowerCase())
    );
    setMatched(result);
  };

  return (
    <div className="form-container">
      <h2 className="hero-title">Request Blood</h2>
      <p className="hero-desc">Find nearest available donors instantly</p>

      <form onSubmit={handleSearch} className="request-form"> {/* Add class */}
        <input
          placeholder="Blood Group (e.g., O+)"
          value={blood}
          onChange={(e) => setBlood(e.target.value)}
          className="form-input" // Add class
          required
        />
        <input
          placeholder="Location (e.g., Hyderabad)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="form-input"
        />
        <select className="form-input">
          <option>Normal Priority</option>
          <option>Urgent</option>
          <option>Critical</option>
        </select>
        <button type="submit" className="submit-btn">Find Donors</button> {/* Update class */}
      </form>

      <h3>{matched.length} Matching Donors:</h3>
      <div className="donors-list">
        {matched.length === 0 ? (
          <p className="no-match">No available donors nearby</p>
        ) : (
          matched.map((d) => (
            <div key={d.id} className="donor-card">
              <h4>{d.name}</h4>
              <p><strong>{d.blood}</strong> - {d.location} ({d.distance})</p>
              <p>📞 {d.contact}</p>
              <button className="contact-btn">Contact Donor</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BloodRequest;