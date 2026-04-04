import React, { useState, useEffect } from "react"; // cleaned
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth, RecaptchaVerifier, signInWithPhoneNumber, signInWithCredential, PhoneAuthProvider } from "../firebase";
import {
  ArrowLeft,
  Phone,
  Shield,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import "../styles/Auth.css";

function AuthPage({ setUser }) {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    const storedVerificationId = localStorage.getItem("bloodhub_verificationId");
    const storedPhone = localStorage.getItem("bloodhub_phone");
    if (storedVerificationId) {
      setVerificationId(storedVerificationId);
    }
    if (storedPhone) {
      setPhone(storedPhone);
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (!verificationId) {
      setError("Verification session expired. Please try again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const result = await signInWithCredential(auth, credential);
      const user = result.user;
      setUser({
        uid: user.uid,
        name: user.displayName || "User",
        email: user.email,
        phone: user.phoneNumber,
        photoURL: user.photoURL
      });
      localStorage.setItem("bloodhub_user", JSON.stringify({
        uid: user.uid,
        name: user.displayName || "User",
        email: user.email,
        phone: user.phoneNumber,
        photoURL: user.photoURL
      }));
      // Clean up
      localStorage.removeItem("bloodhub_verificationId");
      localStorage.removeItem("bloodhub_phone");
      navigate("/dashboard");
    } catch (err) {
      console.error("OTP verification error:", err);
      if (err.code === 'auth/invalid-verification-code') {
        setError("Invalid OTP. Please check and try again.");
      } else if (err.code === 'auth/code-expired') {
        setError("OTP has expired. Please request a new one.");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError(err.message || "Unable to verify OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setResendLoading(true);
    setError("");

    try {
      // Re-initialize reCAPTCHA if needed
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container-otp', {
          size: 'invisible',
          callback: (response) => {
            console.log("reCAPTCHA solved for resend");
          },
          'expired-callback': () => {
            setError("reCAPTCHA expired. Please refresh the page.");
          }
        });
      }

      const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      localStorage.setItem("bloodhub_verificationId", result.verificationId);
      setVerificationId(result.verificationId);
      setCountdown(30);
      setOtp(""); // Clear previous OTP

      // Restart countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      console.error("Resend OTP error:", err);
      if (err.code === 'auth/too-many-requests') {
        setError("Too many requests. Please try again later.");
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } finally {
      setResendLoading(false);
    }
  };

  const handleBack = () => {
    localStorage.removeItem("bloodhub_verificationId");
    localStorage.removeItem("bloodhub_phone");
    navigate("/");
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 }
    }
  };

  return (
    <motion.div
      className="auth-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left Side - Info */}
      <motion.div
        className="auth-left otp-left"
        variants={itemVariants}
      >
        <div className="brand-section">
          <motion.div
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Shield size={40} className="logo-icon" />
            <span className="logo-text">BloodHub</span>
          </motion.div>
          <h1 className="brand-title">Secure Verification</h1>
          <p className="brand-subtitle">
            We've sent a 6-digit code to your phone number for verification. This ensures the security of your account and helps us provide you with the best experience.
          </p>
        </div>

        <div className="security-features">
          <div className="security-item">
            <CheckCircle size={20} className="security-icon" />
            <span>End-to-end encrypted</span>
          </div>
          <div className="security-item">
            <CheckCircle size={20} className="security-icon" />
            <span>One-time verification</span>
          </div>
          <div className="security-item">
            <CheckCircle size={20} className="security-icon" />
            <span>Secure authentication</span>
          </div>
        </div>
      </motion.div>

      {/* Right Side - OTP Form */}
      <motion.div
        className="auth-right"
        variants={itemVariants}
      >
        <div className="otp-form-container">
          <motion.button
            className="back-btn"
            onClick={handleBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
            Back to Login
          </motion.button>

          <motion.div
            className="otp-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="otp-icon">
              <Phone size={48} />
            </div>
            <h2>Enter Verification Code</h2>
            <p>We've sent a 6-digit code to</p>
            <div className="phone-display">
              {phone || "+91 XXXXXXX"}
            </div>
          </motion.div>

          <motion.form
            className="otp-form"
            onSubmit={(e) => { e.preventDefault(); handleVerify(); }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="otp-input-group">
              <label>Enter 6-digit code</label>
              <div className="otp-input-wrapper">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  className="otp-input"
                  autoFocus
                />
                <div className="otp-visual">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className={`otp-digit ${otp.length > index ? 'filled' : ''}`}
                    >
                      {otp[index] || ''}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <motion.div
                className="error-message otp-error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="auth-submit-btn otp-submit"
              disabled={loading || otp.length !== 6}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  Verify Code
                  <CheckCircle size={18} />
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.div
            className="resend-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="resend-text">
              Didn't receive the code?
              <button
                type="button"
                className={`resend-btn ${countdown > 0 ? 'disabled' : ''}`}
                onClick={handleResendOTP}
                disabled={countdown > 0 || resendLoading}
              >
                {resendLoading ? (
                  <>
                    <RefreshCw size={16} className="spinning" />
                    Sending...
                  </>
                ) : countdown > 0 ? (
                  `Resend in ${countdown}s`
                ) : (
                  <>
                    <RefreshCw size={16} />
                    Resend Code
                  </>
                )}
              </button>
            </p>
          </motion.div>

          <div id="recaptcha-container-otp"></div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AuthPage; // exported
