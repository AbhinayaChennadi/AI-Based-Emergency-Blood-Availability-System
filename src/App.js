import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import DonorReg from "./pages/DonorReg";
import BloodRequest from "./pages/BloodRequest";
import Loginpage from "./pages/Loginpage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
          phone: firebaseUser.phoneNumber,
          photoURL: firebaseUser.photoURL
        };
        setUser(userData);
        localStorage.setItem("bloodhub_user", JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem("bloodhub_user");
      }
      setLoading(false);
    });

    const loadData = async () => {
      try {
        const [donorRes, requestRes] = await Promise.all([
          fetch("/api/donors"),
          fetch("/api/requests"),
        ]);

        const donorsData = donorRes.ok ? await donorRes.json() : [];
        const requestsData = requestRes.ok ? await requestRes.json() : [];

        setDonors(Array.isArray(donorsData) ? donorsData : []);
        setRequests(Array.isArray(requestsData) ? requestsData : []);
      } catch (error) {
        console.error("Unable to load data:", error);
      }
    };

    loadData();

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <div style={{ paddingTop: "90px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Loginpage setUser={setUser} />} />
          <Route 
            path="/donate" 
            element={
              <ProtectedRoute 
                element={<DonorReg setDonors={setDonors} />}
                isAuthenticated={!!user}
                loading={loading}
              />
            } 
          />
          <Route
            path="/request"
            element={
              <ProtectedRoute 
                element={
                  <BloodRequest donors={donors} requests={requests} setRequests={setRequests} />
                }
                isAuthenticated={!!user}
                loading={loading}
              />
            }
          />
          <Route path="/auth" element={<AuthPage setUser={setUser} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute 
                element={
                  <Dashboard donors={donors} requests={requests} user={user} loading={loading} />
                }
                isAuthenticated={!!user}
                loading={loading}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
