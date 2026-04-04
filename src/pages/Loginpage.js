import React, { useState, useEffect } from "react"; // cleaned
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "../firebase";
import {
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  Heart,
  Shield,
  Users,
  Award,
  ArrowRight
} from "lucide-react";
import "../styles/Auth.css";

function Loginpage({ setUser }) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const features = [
    {
      icon: <Heart size={48} />,
      title: "Save Lives",
      description: "Your donation can save up to 3 lives. Every drop counts in emergency situations."
    },
    {
      icon: <Shield size={48} />,
      title: "Secure & Safe",
      description: "Advanced AI matching ensures safe blood transfusions with 100% compatibility."
    },
    {
      icon: <Users size={48} />,
      title: "Community",
      description: "Join thousands of donors and recipients in our life-saving community."
    },
    {
      icon: <Award size={48} />,
      title: "Recognition",
      description: "Get recognized for your contributions with certificates and community appreciation."
    }
  ];

  useEffect(() => {
    // Initialize reCAPTCHA verifier for phone auth
    const initializeRecaptcha = () => {
      if (!window.recaptchaVerifier && document.getElementById('recaptcha-container')) {
        try {
          window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
            callback: (response) => {
              console.log("reCAPTCHA solved");
            },
            'expired-callback': () => {
              setError("reCAPTCHA expired. Please try again.");
            }
          });
        } catch (error) {
          console.error("Error initializing reCAPTCHA:", error);
          setError("Failed to initialize reCAPTCHA. Please refresh the page.");
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initializeRecaptcha, 100);

    // Auto-slide features
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      clearInterval(slideTimer);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (phone.length !== 10) {
      setError("Mobile number must be 10 digits.");
      setLoading(false);
      return;
    }

    if (!window.recaptchaVerifier) {
      setError("reCAPTCHA not initialized. Please refresh the page and try again.");
      setLoading(false);
      return;
    }

    try {
      const phoneNumber = `+91${phone}`;
      const result = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      localStorage.setItem("bloodhub_verificationId", result.verificationId);
      localStorage.setItem("bloodhub_phone", phoneNumber);
      navigate("/auth");
    } catch (err) {
      console.error("Phone auth error:", err);

      // Handle specific Firebase errors
      if (err.code === 'auth/invalid-phone-number') {
        setError("Invalid phone number format.");
      } else if (err.code === 'auth/missing-phone-number') {
        setError("Phone number is required.");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Too many requests. Please try again later.");
      } else if (err.code === 'auth/operation-not-allowed') {
        setError("Phone authentication is not enabled. Please use email login instead.");
      } else {
        setError(err.message || "Failed to send OTP. Please try email login instead.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
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
      navigate("/dashboard");
    } catch (err) {
      console.error("Email sign in error:", err);

      // Try to create account if sign in fails
      if (err.code === 'auth/user-not-found') {
        try {
          const result = await createUserWithEmailAndPassword(auth, email, password);
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
          navigate("/dashboard");
        } catch (createErr) {
          console.error("Account creation error:", createErr);
          if (createErr.code === 'auth/weak-password') {
            setError("Password should be at least 6 characters.");
          } else if (createErr.code === 'auth/email-already-in-use') {
            setError("Email already in use. Please sign in instead.");
          } else {
            setError(createErr.message || "Failed to create account.");
          }
        }
      } else {
        if (err.code === 'auth/wrong-password') {
          setError("Incorrect password.");
        } else if (err.code === 'auth/invalid-email') {
          setError("Invalid email format.");
        } else {
          setError(err.message || "Sign in failed.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        phone: user.phoneNumber,
        photoURL: user.photoURL
      });
      localStorage.setItem("bloodhub_user", JSON.stringify({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        phone: user.phoneNumber,
        photoURL: user.photoURL
      }));
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError("Google sign-in was cancelled.");
      } else if (err.code === 'auth/popup-blocked') {
        setError("Popup was blocked. Please allow popups for this site.");
      } else if (err.code === 'auth/operation-not-allowed') {
        setError("Google authentication is not enabled. Please use email login instead.");
      } else {
        setError(err.message || "Google login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      className="auth-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left Side - Features */}
      <motion.div
        className="auth-left"
        variants={itemVariants}
      >
        <div className="brand-section">
          <motion.div
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Heart size={40} className="logo-icon" />
            <span className="logo-text">BloodHub</span>
          </motion.div>
          <h1 className="brand-title">AI-Powered Blood Donation Platform</h1>
          <p className="brand-subtitle">
            Connect donors with those in need through intelligent matching and real-time emergency response.
          </p>
        </div>

        <div className="features-carousel">
          <motion.div
            key={currentSlide}
            className="feature-slide"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="feature-icon">
              {features[currentSlide].icon}
            </div>
            <h3 className="feature-title">{features[currentSlide].title}</h3>
            <p className="feature-description">{features[currentSlide].description}</p>
          </motion.div>

          <div className="carousel-indicators">
            {features.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="stats-preview">
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Lives Saved</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Donors</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support</span>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div
        className="auth-right"
        variants={itemVariants}
      >
        <div className="auth-form-container">
          <motion.div
            className="auth-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2>Welcome Back</h2>
            <p>Sign in to your account to continue</p>
          </motion.div>

          <div className="auth-tabs">
            <button
              className={`auth-tab ${!isEmailMode ? 'active' : ''}`}
              onClick={() => setIsEmailMode(false)}
            >
              <Phone size={18} />
              Phone
            </button>
            <button
              className={`auth-tab ${isEmailMode ? 'active' : ''}`}
              onClick={() => setIsEmailMode(true)}
            >
              <Mail size={18} />
              Email
            </button>
          </div>

          {isEmailMode ? (
            <motion.form
              className="auth-form"
              onSubmit={handleEmailSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={20} className="input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  className="error-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <>
                    Continue
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.form
              className="auth-form"
              onSubmit={handlePhoneSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="form-group">
                <label>Phone Number</label>
                <div className="phone-input-wrapper">
                  <div className="country-code">
                    <span>+91</span>
                  </div>
                  <div className="input-wrapper">
                    <Phone size={20} className="input-icon" />
                    <input
                      type="text"
                      placeholder="Enter 10-digit number"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      required
                    />
                  </div>
                </div>
              </div>

              {error && (
                <motion.div
                  className="error-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <>
                    Send OTP
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}

          <div className="auth-divider">
            <div className="divider-line"></div>
            <span>or continue with</span>
            <div className="divider-line"></div>
          </div>

          <motion.button
            className="google-auth-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="google-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </motion.button>

          <p className="auth-terms">
            By signing in, you agree to our{" "}
            <a href="#" className="terms-link">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="terms-link">Privacy Policy</a>
          </p>

          <div id="recaptcha-container"></div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Loginpage; // exported

