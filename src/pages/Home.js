import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import blood from "../assets/bloodimg.png";

import StatsComponent from "../components/StatsComponent";
import InfoSection from "../components/InfoSection";
import Features from "../components/Features";

function Home() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  /* 🔥 LISTEN NAVBAR CLICK */
  useEffect(() => {
    const openModal = () => setShowModal(true);

    window.addEventListener("openDonorModal", openModal);

    return () => {
      window.removeEventListener("openDonorModal", openModal);
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-container">

          <div className="hero-left">
            <h1 className="hero-title">
              Join the <br />
              Lifesaving <br />
              Revolution
            </h1>

            <p className="hero-desc">
              A crowdsourcing platform for blood & platelets,
              empowering everyone to give & receive the greatest gift of life.
            </p>

            <span className="free-text">It's Absolutely Free</span>
          </div>

          <div className="hero-right">
            <img src={blood} alt="Blood donation" />
          </div>

        </div>
      </section>

      <StatsComponent />
      <InfoSection />
      <Features />

      {/* 🔥 MODAL */}
      {showModal && (
        <div style={overlay}>
          <div style={modal}>

            <h2>Donor Eligibility Criteria</h2>

            <ul style={list}>
              <li>Age: 18–65 years</li>
              <li>Minimum weight: 45kg</li>
              <li>Healthy & no infection</li>
              <li>No recent surgery</li>
              <li>Normal hemoglobin</li>
              <li>No heavy medication</li>
            </ul>

            <div style={btnRow}>
              <button style={cancelBtn} onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button
                style={continueBtn}
                onClick={() => {
                  setShowModal(false);
                  navigate("/donate");
                }}
              >
                Continue
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Home;

/* STYLES */
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};

const modal = {
  width: "400px",
  background: "#fff",
  padding: "25px",
  borderRadius: "10px"
};

const list = {
  marginTop: "10px",
  color: "#555",
  lineHeight: "1.6"
};

const btnRow = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "20px"
};

const cancelBtn = {
  border: "1px solid red",
  background: "#fff",
  color: "red",
  padding: "8px 15px",
  cursor: "pointer"
};

const continueBtn = {
  background: "red",
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  cursor: "pointer"
};