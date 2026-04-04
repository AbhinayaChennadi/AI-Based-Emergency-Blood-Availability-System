import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DonorReg from "./pages/DonorReg";
import BloodRequest from "./pages/BloodRequest";
import Loginpage from "./pages/Loginpage";
import AuthPage from "./pages/AuthPage";

function App() {
  const [donors, setDonors] = useState([
    // Mock donors for testing
    { id: 1, name: "Rahul K", blood: "O+", phone: "9876543210", location: "Hyderabad" },
    { id: 2, name: "Priya S", blood: "A+", phone: "9123456789", location: "Secunderabad" },
    { id: 3, name: "Amit R", blood: "B-", phone: "9988776655", location: "Banjara Hills" }
  ]);

  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/donate" element={<DonorReg donors={donors} setDonors={setDonors} />} />
        <Route path="/request" element={<BloodRequest donors={donors} />} />
        <Route path="/auth" element={<AuthPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;