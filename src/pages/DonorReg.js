import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Request.css";

function DonorReg({ setDonors }) {  // ← Props added
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    bloodType: '',
    phone: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDonor = {
      id: Date.now(),
      name: formData.name,
      blood: formData.bloodType,  // ← Matches BloodRequest
      phone: formData.phone,
      location: formData.location
    };
    
    // Add to parent App.js state
    setDonors(prev => [...prev, newDonor]);
    alert(`Welcome ${formData.name}! Donor added.`);
    navigate("/request"); // Go see it work!
  };

  return (
    <div className="form-container">
      <h2>Become a Donor</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <select 
          name="bloodType" 
          value={formData.bloodType}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Group</option>
          <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
          <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
        </select>
        
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        
        <input
          name="location"
          placeholder="City/Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        
        <button type="submit">Register Now</button>
      </form>
      
      <p style={{marginTop: '20px', color: '#ccc'}}>
        It's Free! Save Lives.
      </p>
    </div>
  );
}

export default DonorReg;