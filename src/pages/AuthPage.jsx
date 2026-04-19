import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  sendEmailVerification
} from "../firebase";
import { updateProfile } from "firebase/auth";
import { Heart } from "lucide-react";
import "../styles/Auth.css";
import { apiUrl } from "../config/api";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function AuthPage({ setUser, initialMode = "login" }) {
  const [activeTab, setActiveTab] = useState("login");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const getPreferredName = (firebaseUser) => {
    const displayName = String(firebaseUser?.displayName || "").trim();
    if (displayName) return displayName;
    const emailValue = String(firebaseUser?.email || "").trim();
    if (emailValue.includes("@")) {
      const base = emailValue.split("@")[0].replace(/[._-]+/g, " ").trim();
      if (base) return base.replace(/\b\w/g, (m) => m.toUpperCase());
    }
    return "Member";
  };

  useEffect(() => {
    const mode = location.state?.initialMode || initialMode;
    setActiveTab(mode === "register" || mode === "signup" ? "signup" : "login");
    
    // Explicitly reset fields with a slight delay to catch late browser injections
    const timer = setTimeout(() => {
      setEmail("");
      setPassword("");
      setName("");
    }, 100);

    return () => clearTimeout(timer);
  }, [initialMode, location]);

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      setUser({
        uid: user.uid,
        name: getPreferredName(user),
        email: user.email,
        phone: user.phoneNumber,
        photoURL: user.photoURL
      });
      localStorage.setItem("bloodhub_user", JSON.stringify({
        uid: user.uid,
        name: getPreferredName(user),
        email: user.email,
        phone: user.phoneNumber,
        photoURL: user.photoURL
      }));
      navigate("/welcome");
    } catch (err) {
      console.error("Google auth error:", err);
      setError("Google authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanPassword = String(password || "");
    const cleanName = String(name || "").trim();

    if (!cleanEmail || !cleanPassword) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    if (activeTab === "signup") {
      if (!cleanName) {
        setError("Name is required.");
        setLoading(false);
        return;
      }
      if (cleanPassword.length < 6) {
        setError("Password should be at least 6 characters.");
        setLoading(false);
        return;
      }
      if (cleanPassword !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
    }

    try {
      let user;
      if (activeTab === "signup") {
        const result = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword);
        user = result.user;
        
        try {
          await updateProfile(user, { displayName: cleanName });
        } catch(e) {}
        try {
          await sendEmailVerification(user);
        } catch (_) {}
      } else {
        const result = await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword);
        user = result.user;
      }

      setUser({
        uid: user.uid,
        name: getPreferredName(user),
        email: user.email,
        phone: user.phoneNumber,
        photoURL: user.photoURL
      });
      localStorage.setItem("bloodhub_user", JSON.stringify({
        uid: user.uid,
        name: getPreferredName(user),
        email: user.email,
        phone: user.phoneNumber,
        photoURL: user.photoURL
      }));
      navigate("/welcome");
    } catch (err) {
      setError("Authentication Failed. Invalid combinations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <motion.div
        className="auth-single-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-card-top">
          <Heart size={32} className="top-heart-icon" />
          <h2>{activeTab === "signup" ? "Create Account" : "Member Login"}</h2>
          <p>{activeTab === "signup" ? "Join the BloodHub community securely" : "Securely sign in to your BloodHub account"}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "login" ? (
              <LoginForm
                email={email} setEmail={setEmail}
                password={password} setPassword={setPassword}
                onSubmit={handleEmailSubmit}
                onGoogle={handleGoogleAuth}
                loading={loading} error={error} success={success}
                switchTab={() => { setActiveTab("signup"); setError(""); }}
              />
            ) : (
              <SignupForm
                name={name} setName={setName}
                email={email} setEmail={setEmail}
                password={password} setPassword={setPassword}
                confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                onSubmit={handleEmailSubmit}
                onGoogle={handleGoogleAuth}
                loading={loading} error={error} success={success}
                switchTab={() => { setActiveTab("login"); setError(""); }}
              />
            )}
          </motion.div>
        </AnimatePresence>

      </motion.div>
    </div>
  );
}

export default AuthPage;
