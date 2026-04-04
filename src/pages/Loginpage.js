

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Loginpage() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      alert("Mobile number must be 10 digits");
      return;
    }

    // ✅ ONLY navigate on button click
    navigate("/auth");
  };

  return (
    <div className="login-wrapper">
      <div className="login-left-box">
        <h1 className="login-heading">Login / Register</h1>
        <p className="login-text">Enter your phone number</p>

        <form onSubmit={handleSubmit}>
          <div className="login-phone-row">
            <span className="login-country">IN</span>
            <span className="login-code">+91</span>

            <input
              type="text"
              placeholder="Enter number"
              maxLength="10"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="login-phone-input"
            />
          </div>

          <div className="login-underline"></div>

          <p className="login-error">
            {phone.length > 0 && phone.length < 10
              ? "Mobile number must be 10 digits"
              : ""}
          </p>

          <button type="submit" className="login-continue-btn">
            Continue
          </button>
        </form>

        <div className="login-or-row">
          <div className="login-or-line"></div>
          <span>or</span>
          <div className="login-or-line"></div>
        </div>

        {/* ✅ ALSO NAVIGATE */}
        <button
          className="login-option-btn"
          onClick={() => navigate("/auth")}
        >
          Continue with Google
        </button>

        <button
          className="login-option-btn"
          onClick={() => navigate("/auth")}
        >
          Continue with Email
        </button>

        <p className="login-terms">
          By signing up you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default Loginpage;