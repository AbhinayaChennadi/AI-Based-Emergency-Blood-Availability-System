import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Users, Droplet, Shield, ArrowRight, CheckCircle } from "lucide-react";
import "../styles/Home.css";
import blood from "../assets/bloodimg.png";

import StatsComponent from "../components/StatsComponent";
import InfoSection from "../components/InfoSection";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  /* 🔥 LISTEN NAVBAR CLICK */
  useEffect(() => {
    const openModal = () => setShowModal(true);

    window.addEventListener("openDonorModal", openModal);

    return () => {
      window.removeEventListener("openDonorModal", openModal);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <>
      {/* HERO */}
      <motion.section
        className="hero"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="hero-container"
          style={{ y }}
        >
          <motion.div
            className="hero-left"
            variants={itemVariants}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="hero-badge">
                <Heart className="hero-icon" size={16} />
                <span>Trusted by 10,000+ Lives Saved</span>
              </div>

              <h1 className="hero-title">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Every Drop
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Counts
                </motion.span>
              </h1>

              <motion.p
                className="hero-desc"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Join India's largest blood donation network. Connect donors with patients
                in real-time, powered by AI-driven matching technology.
              </motion.p>

              <motion.div
                className="hero-stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <div className="stat-item">
                  <Users size={24} />
                  <span>50K+ Donors</span>
                </div>
                <div className="stat-item">
                  <Droplet size={24} />
                  <span>25K+ Lives Saved</span>
                </div>
                <div className="stat-item">
                  <Shield size={24} />
                  <span>100% Verified</span>
                </div>
              </motion.div>

              <motion.div
                className="hero-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <motion.button
                  className="btn-primary"
                  onClick={() => navigate("/donate")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Become a Donor
                  <ArrowRight size={18} />
                </motion.button>

                <motion.button
                  className="btn-secondary"
                  onClick={() => navigate("/request")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Need Blood?
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="hero-image-container"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={blood} alt="Blood donation" className="hero-image" />
              <motion.div
                className="floating-card card-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <CheckCircle size={20} color="#4CAF50" />
                <span>Emergency Match Found</span>
              </motion.div>

              <motion.div
                className="floating-card card-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.7 }}
              >
                <Users size={20} color="#2196F3" />
                <span>5 Donors Available</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.section>

      <StatsComponent />
      <InfoSection />
      <Features />
      <Footer />

      {/* 🔥 MODAL */}
      {showModal && (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Donor Eligibility Criteria
            </motion.h2>

            <motion.ul
              className="modal-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <CheckCircle size={16} color="#4CAF50" style={{ marginRight: '8px' }} />
                Age: 18–65 years
              </motion.li>
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <CheckCircle size={16} color="#4CAF50" style={{ marginRight: '8px' }} />
                Minimum weight: 45kg
              </motion.li>
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <CheckCircle size={16} color="#4CAF50" style={{ marginRight: '8px' }} />
                Healthy & no infection
              </motion.li>
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <CheckCircle size={16} color="#4CAF50" style={{ marginRight: '8px' }} />
                No recent surgery
              </motion.li>
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <CheckCircle size={16} color="#4CAF50" style={{ marginRight: '8px' }} />
                Normal hemoglobin
              </motion.li>
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <CheckCircle size={16} color="#4CAF50" style={{ marginRight: '8px' }} />
                No heavy medication
              </motion.li>
            </motion.ul>

            <motion.div
              className="modal-btn-row"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.button
                className="modal-cancel-btn"
                onClick={() => setShowModal(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>

              <motion.button
                className="modal-continue-btn"
                onClick={() => {
                  setShowModal(false);
                  navigate("/donate");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default Home;