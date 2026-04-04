import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    if (!otp) {
      alert("OTP is required");
      return;
    }

    alert("Verified Successfully 🎉");
    navigate("/dashboard");
  };

  return (
    <div style={container}>
      <div style={card}>

        {/* 🔙 BACK BUTTON */}
        <button 
          onClick={() => navigate("/login")}
          style={backBtn}
        >
          ← Back to Login
        </button>

        <h1 style={heading}>Verify your number</h1>

        <p style={subtext}>
          Please enter verification code (OTP) sent to:
        </p>

        <p style={phone}>
          +91XXXXXX8792 <span style={edit}>✏</span>
        </p>

        <label style={label}>Enter OTP Code</label>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          style={input}
        />

        {otp === "" && <p style={error}>OTP is required</p>}

        <p style={resendText}>
          Haven't received yet? <span style={resend}>Resend OTP</span>
        </p>

        <button style={btn} onClick={handleVerify}>
          Verify code
        </button>

      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#f5f5f5"
};

const card = {
  width: "500px",
  padding: "50px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 5px 25px rgba(0,0,0,0.08)"
};

const backBtn = {
  background: "transparent",
  border: "none",
  color: "#555",
  cursor: "pointer",
  marginBottom: "10px",
  fontSize: "14px"
};

const heading = {
  color: "#e53935",
  fontSize: "40px",
  marginBottom: "20px"
};

const subtext = {
  color: "#666",
  fontSize: "18px"
};

const phone = {
  fontWeight: "bold",
  marginTop: "10px",
  marginBottom: "30px"
};
const edit = {
  color: "#e53935",
  marginLeft: "8px",
  cursor: "pointer",
  display: "inline-block",
  transform: "rotate(125deg)", // 🔥 diagonal top→down
};

const label = {
  color: "#1976d2",
  fontSize: "14px"
};

const input = {
  width: "100%",
  border: "none",
  borderBottom: "2px solid #1976d2",
  padding: "10px 0",
  fontSize: "18px",
  outline: "none",
  marginTop: "5px"
};

const error = {
  color: "#e53935",
  marginTop: "8px",
  fontSize: "14px"
};

const resendText = {
  marginTop: "25px",
  color: "#666"
};

const resend = {
  color: "#e53935",
  cursor: "pointer",
  fontWeight: "500"
};

const btn = {
  width: "100%",
  marginTop: "35px",
  padding: "15px",
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer"
};

export default AuthPage;